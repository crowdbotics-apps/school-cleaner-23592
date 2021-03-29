from django.urls import path, include
from rest_framework.routers import DefaultRouter

from inspections.api.v1.viewsets import (ProductTypeViewSet)


router = DefaultRouter()
router.register('product-type', ProductTypeViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
