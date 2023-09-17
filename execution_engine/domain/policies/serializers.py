from domain.nodes.models import Node
from domain.policies.models import Policy
from rest_framework import serializers


class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)

        for key in ["nodes"]:
            if key not in data:
                raise KeyError(key)

        nodes = []

        for node in data["nodes"]:
            for key in ["type"]:
                if key not in node:
                    raise KeyError(key)

            nodes.append(Node.parse(node))

        data["nodes"] = nodes

        return data

    def update(self, instance, validated_data):
        data = validated_data

        for key in ["nodes"]:
            if key not in data:
                raise KeyError(key)

        nodes = []

        for node in data.get("nodes"):
            for key in ["type"]:
                if key not in node:
                    raise KeyError(key)

            nodes.append(Node.parse(node))

        instance.nodes = nodes
        instance.save()

        return instance
