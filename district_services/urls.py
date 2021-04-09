from django.urls import path

from district_services.views import load_default_data

urlpatterns = [
    path("loaddata/", load_default_data)
]
