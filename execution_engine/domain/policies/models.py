import uuid

from django.db import models


class Policy(models.Model):
    id = models.TextField(default=uuid.uuid4, editable=False, primary_key=True)
    output = models.BooleanField(default=True)

    def __str__(self):
        return f""
