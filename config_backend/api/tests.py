# from django.test import TestCase
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APIClient
# from domain.decisions.models import Decision
# from domain.policies.models import Policy


# class PolicyAPITest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.decision_data = {"value": "1", "variable": "variable"}

#     def create_policy(self):
#         return Policy.objects.create(id="default")

#     def create_decision(self, policy):
#         return Decision.objects.create(policy=policy, value="1", variable="variable")

#     def test_read_policy(self):
#         policy = self.create_policy()

#         self.create_decision(policy)

#         response = self.client.get(reverse("policy-read", args=[policy.id]))

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data["decisions"]), 1)

#     def test_update_policy(self):
#         policy = self.create_policy()
#         decision = self.create_decision(policy)

#         updated_data = {"decisions": [self.decision_data]}

#         response = self.client.patch(
#             reverse("policy-update", args=[policy.id]), updated_data, format="json"
#         )

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(Decision.objects.get().criteria, decision.criteria)
#         self.assertEqual(Decision.objects.get().value, int(decision.value))
