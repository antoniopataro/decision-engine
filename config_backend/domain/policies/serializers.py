from domain.decisions.serializers import DecisionSerializer
from domain.decisions.models import Decision
from domain.policies.models import Policy
from rest_framework import serializers


class PolicySerializer(serializers.ModelSerializer):
    decisions = DecisionSerializer(many=True)

    class Meta:
        model = Policy
        fields = "__all__"

    def update(self, instance, validated_data):
        if "decisions" in validated_data:
            decisions = validated_data.pop("decisions")

            instance.decisions.all().delete()

            for decision in decisions:
                instance.decisions.add(
                    Decision.objects.create(policy_id=instance.id, **decision)
                )

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
