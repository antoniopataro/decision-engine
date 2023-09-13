from rest_framework import serializers
from domain.decisions.models import Decision


class DecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decision
        fields = "__all__"
