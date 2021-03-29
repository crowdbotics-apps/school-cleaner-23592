from django.db.models import Sum, Count
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from district_services.api.v1.permissions import DistrictUserPermission, SchoolBuildingPermission, SectionPermission, \
    RoomTypePermission, RoomPermission
from district_services.api.v1.serializers import DistrictSerializer, SchoolBuildingSerializer, SectionSerializer, \
    RoomSerializer, RoomTypeSerializer
from district_services.models import District, SchoolBuilding, Section, Room, RoomType


class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, DistrictUserPermission]

    def get_queryset(self):
        queryset = self.queryset
        if self.request.user.is_superuser:
            return queryset
        return queryset.filter(admins=self.request.user)


class SchoolBuildingViewSet(viewsets.ModelViewSet):
    serializer_class = SchoolBuildingSerializer
    queryset = SchoolBuilding.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, SchoolBuildingPermission]

    def get_queryset(self):
        queryset = self.queryset
        district = self.request.query_params.get("district")
        if district:
            queryset = queryset.filter(district_id=int(district))
        if self.request.user.is_superuser:
            return queryset
        return queryset.filter(inspectors=self.request.user)


class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all().annotate(
            rooms=Count('rooms_in_section')).annotate(
        square_feet=Sum("rooms_in_section__square_feet")).annotate(
        desks=Sum("rooms_in_section__desks")).annotate(
        windows=Sum("rooms_in_section__windows")).annotate(
        trash_cans=Sum("rooms_in_section__trash_cans"))
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, SectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        school = self.request.query_params.get("school")
        if school:
            queryset = queryset.filter(school_id=int(school))
        if self.request.user.is_superuser:
            return queryset
        return queryset.filter(school__inspectors=self.request.user)


class RoomTypeViewSet(viewsets.ModelViewSet):
    serializer_class = RoomTypeSerializer
    queryset = RoomType.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, RoomTypePermission]

    def get_queryset(self):
        queryset = self.queryset
        return queryset


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, RoomPermission]

    def get_queryset(self):
        queryset = self.queryset
        section = self.request.query_params.get("section")
        if section:
            queryset = queryset.filter(section_id=int(section))
        if self.request.user.is_superuser:
            return queryset
        return queryset.filter(school__inspectors=self.request.user)
