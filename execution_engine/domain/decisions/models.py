from django.db import models
from domain.policies.models import Policy
import uuid


class Decision(models.Model):
    class Criteria(models.TextChoices):
        LT = "<"
        LTE = "<="
        EQUAL = "=="
        GTE = ">="
        GT = ">"

    criteria = models.CharField(
        choices=Criteria.choices, default=Criteria.EQUAL, max_length=2
    )
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    policy = models.ForeignKey(
        Policy, related_name="decisions", on_delete=models.CASCADE
    )
    value = models.IntegerField()
    variable = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.variable} {self.criteria} {self.value} -> false"
