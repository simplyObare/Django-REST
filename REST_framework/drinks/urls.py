from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("drinks/", views.drink_list),
    path("drinks/<int:id>", views.drink_detail),
]
