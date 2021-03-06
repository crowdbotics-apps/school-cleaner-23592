from django.urls import path, include
from rest_framework.routers import DefaultRouter

from district_services.api.v1.viewsets import (
    DistrictViewSet, SchoolBuildingViewSet, SectionViewSet, RoomViewSet, AdminUserViewSet,
    InspectorUserViewSet, SimpleUserViewSet, EquipmentNeededViewSet,
    EmployeeInDistrictViewSet, EquipmentInSchoolBuildingViewSet
)


router = DefaultRouter()
router.register('district', DistrictViewSet)
router.register('school', SchoolBuildingViewSet)
router.register('section', SectionViewSet)

# with default data
# router.register('tool-type', ToolTypeViewSet)
# router.register('equipment', EquipmentViewSet)
# router.register('room-type', RoomTypeViewSet)

router.register('equipment', EquipmentInSchoolBuildingViewSet)
router.register('equipment-needed', EquipmentNeededViewSet)
router.register('room', RoomViewSet)
router.register('admin-users', EmployeeInDistrictViewSet)
router.register('inspector-users', InspectorUserViewSet)
router.register('simple-users', SimpleUserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
