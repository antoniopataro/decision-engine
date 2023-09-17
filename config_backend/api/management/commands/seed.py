import json
from django.core.management.base import BaseCommand
from domain.policies.models import Policy


class Command(BaseCommand):
    help = "seeds the database with default data from a JSON file"

    def handle(self, *args, **options):
        with open("seed.json", "r") as json_file:
            seed = json.load(json_file)

        policies = seed.get("policies", [])

        for policy in policies:
            policy = Policy.objects.create(**policy)

        self.stdout.write(self.style.SUCCESS("successfully seeded the database"))
