from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.get_user, name="users"),
    path("create-user/", views.create_user, name="create-user"),
]
