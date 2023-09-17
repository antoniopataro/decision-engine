import uuid
from django.db import models


class Policy(models.Model):
    id = models.TextField(default=uuid.uuid4, editable=False, primary_key=True)
    nodes = models.JSONField()

    def __str__(self):
        return f""
