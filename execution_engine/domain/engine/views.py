from rest_framework.decorators import api_view
import json
from domain.policies.models import Policy
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status


def decode_request_body(body: any):
    try:
        return json.loads(body), None
    except json.JSONDecodeError as e:
        return None, Response(
            {"error": "invalid json data: " + str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )

def json_decision(decision: bool):
    return {"decision": decision}


def read_policy(id: str):
    try:
        return Policy.objects.get(id=id), None
    except Policy.DoesNotExist:
        return None, Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def execute(req: Request):
    policy, error = read_policy("default")

    if isinstance(error, Response):
        return error

    data, error = decode_request_body(req.body)

    if isinstance(error, Response):
        return error
    
    req_variables = req.data.keys()
    req_variables_set = set(req_variables)

    if len(req_variables) == 0 or len(req_variables) != len(req_variables_set):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    decisions = policy.decisions.all()

    if len(decisions) == 0:
        return Response(json_decision(True))

    if len(req_variables) != len(decisions):
        return Response(json_decision(False))
    
    decision_variables_set = set(decision.variable for decision in decisions)
    output = policy.output

    for req_variable in req_variables:
        if req_variable not in decision_variables_set:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        req_value = data[req_variable]

        if type(req_value) is not int:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        decision = None

        for d in decisions:
            if d.variable != req_variable:
                continue

            decision = d

        result = eval(f"{req_value} {decision.criteria} {decision.value}")

        if result == True:
            continue
        
        output = not policy.output

    return Response(json_decision(output))
