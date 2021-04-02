from django.db.models import Sum
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from inspections.api.v1.permissions import InspectionPermission
from inspections.api.v1.serializers import InspectionSerializer, \
    ParameterSerializer, ParameterImageSerializer
from inspections.models import Inspection, Parameter, ParameterImage


class InspectionViewSet(viewsets.ModelViewSet):
    serializer_class = InspectionSerializer
    queryset = Inspection.objects.all().annotate(
        total_points=Sum("inspection_parameters__points"))
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, InspectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        if user.is_superuser:
            queryset = queryset
        if user.role == "admin":
            queryset = queryset.filter(room__section__school__district__admins=user)
        if user.role == "inspector":
            queryset = queryset.filter(room__section__school__inspectors=user)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ParameterViewSet(viewsets.ModelViewSet):
    serializer_class = ParameterSerializer
    queryset = Parameter.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, InspectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        inspection = self.request.query_params.get("inspection")
        if inspection:
            queryset = queryset.filter(inspection_id=int(inspection))
        if user.is_superuser:
            queryset = queryset
        if user.role == "admin":
            queryset = queryset.filter(inspection__room__section__school__district__admins=user)
        if user.role == "inspector":
            queryset = queryset.filter(inspection__room__section__school__inspectors=user)
        return queryset


class ParameterImageViewSet(viewsets.ModelViewSet):
    serializer_class = ParameterImageSerializer
    queryset = ParameterImage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, InspectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        parameter = self.request.query_params.get("parameter")
        if parameter:
            queryset = queryset.filter(parameter_id=int(parameter))
        if user.is_superuser:
            queryset = queryset
        if user.role == "admin":
            queryset = queryset.filter(parameter__inspection__room__section__school__district__admins=user)
        if user.role == "inspector":
            queryset = queryset.filter(parameter__inspection__room__section__school__inspectors=user)
        return queryset
