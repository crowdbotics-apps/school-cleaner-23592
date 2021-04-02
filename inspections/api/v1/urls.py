from django.urls import path, include
from rest_framework.routers import DefaultRouter

from inspections.api.v1.viewsets import (InspectionViewSet, ParameterViewSet,
                                         ParameterImageViewSet)


router = DefaultRouter()
router.register('inspection', InspectionViewSet)
router.register('inspection-parameter', ParameterViewSet)
router.register('inspection-parameter-image', ParameterImageViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
