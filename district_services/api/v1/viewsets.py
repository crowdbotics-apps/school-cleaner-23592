import random

from django.contrib.auth import get_user_model
from django.db.models import Sum, Count
from rest_framework import viewsets, status
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


class InspectorUserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(role="inspector")


class SimpleUserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(role="simple_user")


class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.none()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, DistrictUserPermission]

    def get_queryset(self):
        queryset = District.objects.all().prefetch_related(
            "schools_in_district", "admins").annotate(
            buildings=Count("schools_in_district")).annotate(
            rooms=Count("schools_in_district__sections_in_school__rooms_in_section")).annotate(
            sq_feet=Sum("schools_in_district__sections_in_school__rooms_in_section__square_feet")
        )
        if self.request.user.is_superuser:
            queryset = queryset
        else:
            queryset = queryset.filter(admins=self.request.user)
        return queryset

    @action(methods=['get'], detail=False, url_path='district-code', url_name='district-code')
    def district_code(self, request):
        while True:
            code = random.randint(10000, 99999)
            # code = district_code_generator(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
            district = District.objects.filter(code__exact=code)
            if not district:
                break
        return Response({"code": code})


class SchoolBuildingViewSet(viewsets.ModelViewSet):
    serializer_class = SchoolBuildingSerializer
    queryset = SchoolBuilding.objects.none()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, SchoolBuildingPermission]

    def get_queryset(self):
        queryset = SchoolBuilding.objects.all().prefetch_related(
            "sections_in_school", "inspectors").select_related("district").annotate(
            total_rooms=Count("sections_in_school__rooms_in_section")).annotate(
            total_area=Sum("sections_in_school__rooms_in_section__square_feet")).annotate(
            estimated_time_to_clean=Sum("sections_in_school__rooms_in_section__estimated_time_to_clean")).annotate(
            total_sections=Count("sections_in_school")
        )
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.none()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, SectionPermission]

    def get_queryset(self):
        queryset = Section.objects.all().prefetch_related(
            "rooms_in_section", "people").select_related("school").annotate(
            rooms=Count('rooms_in_section')).annotate(
            square_feet=Sum("rooms_in_section__square_feet")).annotate(
            desks=Sum("rooms_in_section__desks")).annotate(
            windows=Sum("rooms_in_section__windows")).annotate(
            trash_cans=Sum("rooms_in_section__trash_cans")).annotate(
            estimated_time_to_clean=Sum("rooms_in_section__estimated_time_to_clean")
        )
        user = self.request.user
        school = self.request.query_params.get("school")
        district = self.request.query_params.get("district")
        if school:
            queryset = queryset.filter(school_id=int(school))
        if district:
            queryset = queryset.filter(school__district_id=int(district))
        if user.is_superuser:
            queryset = queryset
        elif user.role == "admin":
            queryset = queryset.filter(school__district__admins=user)
        elif user.role == "inspector":
            queryset = queryset.filter(school__inspectors=user)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RoomTypeViewSet(viewsets.ModelViewSet):
    serializer_class = RoomTypeSerializer
    queryset = RoomType.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, RoomTypePermission]


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.none()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, RoomPermission]

    def get_queryset(self):
        queryset = Room.objects.all().select_related("section", "room_type", "cleaner")
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
