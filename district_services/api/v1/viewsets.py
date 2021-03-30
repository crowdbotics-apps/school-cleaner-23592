from django.db.models import Sum, Count
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from district_services.api.v1.permissions import DistrictUserPermission, SchoolBuildingPermission, SectionPermission, \
    RoomTypePermission, RoomPermission
from district_services.api.v1.serializers import DistrictSerializer, SchoolBuildingSerializer, SectionSerializer, \
    RoomSerializer, RoomTypeSerializer
from district_services.models import District, SchoolBuilding, Section, Room, RoomType
from district_services.utils import district_code_generator


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
        total_area=Sum("sections_in_school__rooms_in_section__square_feet")
    )
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

    @action(methods=['get'], detail=False, url_path='room-specs', url_name='room-specs')
    def room_specs(self, request):
        """ TO get rooms with total area against same room type."""
        school = self.request.query_params.get("school")
        queryset = None
        if school:
            queryset = Room.objects.filter(
                section__school_id=int(school)).values(
                "room_type__name", "room_type_id", "estimated_time_to_clean"
            ).annotate(
                Sum('square_feet'),
                Count("room_type__name"),
                # Sum("estimated_time_to_clean"),
            ).order_by("room_type__name")
        response_list = []
        print(queryset)
        if queryset:
            for q in queryset:
                response_list.append(
                    {"room_name": q.get("room_type__name"),
                     "square_feet": q.get("square_feet__sum"),
                     "count": q.get("room_type__name__count")}
                )
        return Response(response_list)

