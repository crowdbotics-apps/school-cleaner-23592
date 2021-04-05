from django.urls import path, include
from rest_framework.routers import DefaultRouter

from district_services.api.v1.viewsets import (
    DistrictViewSet, SchoolBuildingViewSet, SectionViewSet, RoomTypeViewSet, RoomViewSet, AdminUserViewSet,
    InspectorUserViewSet, SimpleUserViewSet, EquipmentViewSet, ToolTypeViewSet
)


router = DefaultRouter()
router.register('district', DistrictViewSet)
router.register('school', SchoolBuildingViewSet)
router.register('section', SectionViewSet)
router.register('tool-type', ToolTypeViewSet)
router.register('equipment', EquipmentViewSet)
router.register('room-type', RoomTypeViewSet)
router.register('room', RoomViewSet)
router.register('admin-users', AdminUserViewSet)
router.register('inspector-users', InspectorUserViewSet)
router.register('simple-users', SimpleUserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
