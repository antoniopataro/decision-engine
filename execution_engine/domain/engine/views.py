from rest_framework.decorators import api_view
import json
from domain.policies.models import Policy
from domain.policies.serializers import PolicySerializer
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status


def decode_request_body(body: bytes) -> tuple[dict, None] | tuple[None, Response]:
    try:
        return json.loads(body), None
    except json.JSONDecodeError as e:
        return None, Response(
            {"error": "invalid json data: " + str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )


def evaluate(criteria: str, node_value: int, variable_value: str):
    return eval(f"{variable_value} {criteria} {node_value}")


def json_output(decision: bool):
    return {"decision": decision}


def read_policy(id: str):
    try:
        return Policy.objects.get(id=id), None
    except Policy.DoesNotExist:
        return None, Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)


def req_variables_has_duplicate(req_variables: list[str]):
    req_variables_set = set(req_variables)

    if len(req_variables) != len(req_variables_set):
        return True

    return False


@api_view(["POST"])
def execute(req: Request, id: str):
    policy, error = read_policy(id)

    if isinstance(error, Response):
        return error

    body, error = decode_request_body(req.body)

    if isinstance(error, Response):
        return error

    if req_variables_has_duplicate(body.keys()):
        return Response(
            {"error": "duplicate variables"}, status=status.HTTP_400_BAD_REQUEST
        )

    serializer = PolicySerializer(policy)

    nodes = serializer.data.get("nodes")

    if len(nodes) == 0:
        return Response(
            {"error": "the policy has no node"}, status=status.HTTP_400_BAD_REQUEST
        )

    node_index = 0
    node = nodes[node_index]

    while node.get("type") == "condition":
        condition = node.get("condition")
        
        criteria = condition.get('criteria')
        node_value = condition.get('value')
        variable = condition.get('variable')

        if variable not in body:
            return Response(
                {"error": f"missing {variable}"}, status=status.HTTP_400_BAD_REQUEST
            )

        variable_value = body.get(variable)

        if evaluate(
            criteria=criteria,
            node_value=node_value,
            variable_value=variable_value
        ):
            node_index = 0
            node = node.get("then")[node_index]
        else:
            if "otherwise" in node:
                node_index = 0
                node = node.get("otherwise")[node_index]
            else:
                node_index += 1

                if node_index == len(nodes):
                    break

                node = nodes[node_index]

    if node.get("type") == "output":
        return Response(json_output(node.get('output')))

    return Response(
        {"error": "could not resolve decision"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )

    # decision_variables_set = set(decision.variable for decision in decisions)
    # output = policy.output

    # for req_variable in req_variables:
    #     if req_variable not in decision_variables_set:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)

    #     req_value = body[req_variable]

    #     if type(req_value) is not int:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)

    #     decision = None

    #     for d in decisions:
    #         if d.variable != req_variable:
    #             continue

    #         decision = d

    #     result = eval(f"{req_value} {decision.criteria} {decision.value}")

    #     if result == True:
    #         continue

    #     output = not policy.output

    # return Response(json_output(output))
