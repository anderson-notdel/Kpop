from django.urls import path

from . import views

app_name = "artists"

urlpatterns = [
    path("", views.GroupListView.as_view(), name="group-list"),
    path("<slug:slug>/", views.GroupDetailView.as_view(), name="group-detail"),
]
