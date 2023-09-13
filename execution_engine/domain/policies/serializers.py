from domain.decisions.serializers import DecisionSerializer
from domain.decisions.models import Decision
from domain.policies.models import Policy
from rest_framework import serializers


class PolicySerializer(serializers.ModelSerializer):
    decisions = DecisionSerializer(many=True)

    class Meta:
        model = Policy
        fields = "__all__"
