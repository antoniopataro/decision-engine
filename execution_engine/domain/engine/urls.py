from django.urls import path
from domain.engine import views

urlpatterns = [
    path("execute/<str:id>", views.execute),
]
