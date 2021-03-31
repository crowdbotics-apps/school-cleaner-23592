from django.contrib.auth import get_user_model
from django.db.models import Sum, Count
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from district_services.api.v1.permissions import DistrictUserPermission, SchoolBuildingPermission, SectionPermission, \
    RoomTypePermission, RoomPermission
from district_services.api.v1.serializers import DistrictSerializer, SchoolBuildingSerializer, SectionSerializer, \
    RoomSerializer, RoomTypeSerializer, UserSerializer, RoomSpecsSerializer
from district_services.models import District, SchoolBuilding, Section, Room, RoomType
from district_services.utils import district_code_generator
User = get_user_model()


class AdminUserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(role="admin")


class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all().annotate(
        buildings=Count("schools_in_district")).annotate(
        rooms=Count("schools_in_district__sections_in_school__rooms_in_section")).annotate(
        sq_feet=Sum("schools_in_district__sections_in_school__rooms_in_section__square_feet")
    )
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, DistrictUserPermission]

    def get_queryset(self):
        queryset = self.queryset
        if self.request.user.is_superuser:
            return queryset
        return queryset.filter(admins=self.request.user)

    @action(methods=['get'], detail=False, url_path='district-code', url_name='district-code')
    def district_code(self, request):
        while True:
            code = district_code_generator(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
            district = District.objects.filter(code__exact=code)
            if not district:
                break
        return Response({"code": code})


class SchoolBuildingViewSet(viewsets.ModelViewSet):
    serializer_class = SchoolBuildingSerializer
    queryset = SchoolBuilding.objects.all().annotate(
        total_rooms=Count("sections_in_school__rooms_in_section")).annotate(
        total_area=Sum("sections_in_school__rooms_in_section__square_feet")).annotate(
        estimated_time_to_clean=Sum("sections_in_school__rooms_in_section__estimated_time_to_clean")
    )
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, SchoolBuildingPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        district = self.request.query_params.get("district")
        if district:
            queryset = queryset.filter(district_id=int(district))
        if user.is_superuser:
            return queryset
        elif user.role == "admin":
            queryset = queryset.filter(district__admins=user)
        elif user.role == "inspector":
            queryset = queryset.filter(inspectors=user)
        return queryset


class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all().annotate(
            rooms=Count('rooms_in_section')).annotate(
        square_feet=Sum("rooms_in_section__square_feet")).annotate(
        desks=Sum("rooms_in_section__desks")).annotate(
        windows=Sum("rooms_in_section__windows")).annotate(
        trash_cans=Sum("rooms_in_section__trash_cans")).annotate(
        estimated_time_to_clean=Sum("rooms_in_section__estimated_time_to_clean")
    )
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, SectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        school = self.request.query_params.get("school")
        district = self.request.query_params.get("district")
        if school:
            queryset = queryset.filter(school_id=int(school))
        if school:
            queryset = queryset.filter(school__district_id=int(district))
        if user.is_superuser:
            queryset = queryset
        elif user.role == "admin":
            queryset = queryset.filter(school__district__admins=user)
        elif user.role == "inspector":
            queryset = queryset.filter(school__inspectors=user)
        return queryset


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
        school = self.request.query_params.get("school")
        section = self.request.query_params.get("section")
        user = self.request.user
        if section:
            queryset = queryset.filter(section_id=int(section))
        if school:
            queryset = queryset.filter(section__school_id=int(school))
        if user.is_superuser:
            queryset = queryset
        elif user.role == "admin":
            queryset = queryset.filter(section__school__district__admins=self.request.user)
        elif user.role == "inspector":
            queryset = queryset.filter(section__school__inspectors=user)
        return queryset

    @action(methods=['get'], detail=False, url_path='room-specs', url_name='room-specs')
    def room_specs(self, request):
        """ TO get rooms with total area against same room type."""
        school = self.request.query_params.get("school")
        section = self.request.query_params.get("section")
        queryset = None
        if school:
            queryset = Room.objects.filter(
                section__school_id=int(school)).values(
                "room_type__name", "room_type_id"
            ).annotate(
                Sum('square_feet'),
                Count("room_type__name"),
                Sum("estimated_time_to_clean"),
            ).order_by("room_type__name")
        elif section:
            queryset = Room.objects.filter(
                section_id=int(section)).values(
                "room_type__name", "room_type_id"
            ).annotate(
                Sum('square_feet'),
                Count("room_type__name"),
                Sum("estimated_time_to_clean"),
            ).order_by("room_type__name")

        serializer = RoomSpecsSerializer(queryset, many=True)
        return Response(serializer.data)
