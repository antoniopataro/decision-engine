import json
from django.core.management.base import BaseCommand
from domain.decisions.models import Decision
from domain.policies.models import Policy


class Command(BaseCommand):
    help = "seeds the database with default data from a JSON file"

    def handle(self, *args, **options):
        with open("seed.json", "r") as json_file:
            seed = json.load(json_file)

        policies = seed.get("policies", [])

        for policy in policies:
            decisions = policy.pop("decisions", [])

            policy = Policy.objects.create(**policy)

            for decision in decisions:
                Decision.objects.create(policy=policy, **decision)

        self.stdout.write(self.style.SUCCESS("successfully seeded the database"))
