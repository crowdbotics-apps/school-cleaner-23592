from django.db.models import Sum, F, IntegerField
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from inspections.api.v1.permissions import ProductTypePermission, ProductNeededPermission, InspectionPermission
from inspections.api.v1.serializers import ProductTypeSerializer, ProductNeededSerializer, InspectionSerializer, \
    ParameterSerializer, ParameterImageSerializer
from inspections.models import ProductType, ProductNeeded, Inspection, Parameter, ParameterImage


class ProductTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, ProductTypePermission]

    def get_queryset(self):
        queryset = self.queryset
        return queryset


class ProductNeededViewSet(viewsets.ModelViewSet):
    serializer_class = ProductNeededSerializer
    queryset = ProductNeeded.objects.all().annotate(
        total_price=Sum(F('price_per_unit') * F('quantity'), output_field=IntegerField())
    )
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, ProductNeededPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        section = self.request.query_params.get("section")
        school = self.request.query_params.get("school")
        if user.is_superuser:
            queryset = queryset
        elif user.role == "admin":
            queryset = queryset.filter(section__school__district__admins=user)
        elif user.role == "inspector":
            queryset = queryset.filter(section__school__inspectors=user)
        if section:
            queryset = queryset.filter(section_id=int(section))
        if school:
            queryset = queryset.filter(section__school_id=int(school))
        return queryset


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
