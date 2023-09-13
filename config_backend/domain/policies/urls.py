from django.urls import path
from domain.policies import views

urlpatterns = [
    path("policy/<str:id>", views.read, name="policy-read"),
    path("policy/<str:id>/update", views.update, name="policy-update"),
]
