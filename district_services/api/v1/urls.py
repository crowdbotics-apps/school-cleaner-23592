from django.urls import path, include
from rest_framework.routers import DefaultRouter

from district_services.api.v1.viewsets import (
    DistrictViewSet, SchoolBuildingViewSet, SectionViewSet, RoomTypeViewSet, RoomViewSet
)


router = DefaultRouter()
router.register('district', DistrictViewSet)
router.register('school', SchoolBuildingViewSet)
router.register('section', SectionViewSet)
router.register('room-type', RoomTypeViewSet)
router.register('room', RoomViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
