from django.db.models import Sum, F, IntegerField
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from inspections.api.v1.permissions import ProductTypePermission, ProductNeededPermission, InspectionPermission
from inspections.api.v1.serializers import ProductTypeSerializer, ProductNeededSerializer, InspectionSerializer
from inspections.models import ProductType, ProductNeeded, Inspection


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
    queryset = ProductNeeded.objects.all().annotate(total_price=Sum(F('price_per_unit') * F('quantity'), output_field=IntegerField()))
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, ProductNeededPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        section = self.request.query_params.get("section")
        school = self.request.query_params.get("school")
        if user.is_superuser or user.role == "admin":
            queryset = queryset
        elif user.role == "inspector":
            queryset = queryset.filter(inspector=user)
        if section:
            queryset = queryset.filter(section_id=int(section))
        if school:
            queryset = queryset.filter(section__school_id=int(school))
        return queryset


class InspectionViewSet(viewsets.ModelViewSet):
    serializer_class = InspectionSerializer
    queryset = Inspection.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, InspectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        return queryset
