from rest_framework.decorators import api_view
import json
from domain.policies.models import Policy
from domain.policies.serializers import PolicySerializer
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError


def decode_request_body(body: bytes) -> tuple[dict, None] | tuple[None, Response]:
    try:
        return json.loads(body), None
    except json.JSONDecodeError as e:
        return None, Response(
            {"error": "invalid json data: " + str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )


def read_policy(id: str):
    try:
        return Policy.objects.get(id=id), None
    except Policy.DoesNotExist:
        return None, Response({"error": "not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def read(_: Request, id: str):
    policy, error = read_policy(id)

    if isinstance(error, Response):
        return error

    serializer = PolicySerializer(policy)
    
    return Response(serializer.data)


@api_view(["PATCH"])
def update(req: Request, id: str):
    policy, error = read_policy(id)

    if isinstance(error, Response):
        return error

    data, error = decode_request_body(req.body)

    if isinstance(error, Response):
        return error

    serializer = PolicySerializer(policy, data=data, partial=True)

    try:
        serializer.is_valid()
        serializer.save()
    except KeyError as e:
        return Response(
            {"error": f"missing {e}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except TypeError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    unrecognized_fields = set(data.keys()) - set(serializer.validated_data.keys())

    if unrecognized_fields:
        return Response(
            {"error": f"unrecognized fields {unrecognized_fields}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(serializer.data)
