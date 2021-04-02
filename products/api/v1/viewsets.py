from django.db.models import Sum, F, IntegerField
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products.api.v1.permissions import ProductTypePermission, ProductNeededPermission, ProductPermission
from products.api.v1.serializers import ProductTypeSerializer, ProductNeededSerializer, ProductSerializer
from products.models import ProductType, ProductNeeded, Product


class ProductTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, ProductTypePermission]

    def get_queryset(self):
        queryset = self.queryset
        return queryset


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, ProductPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        if user.is_superuser:
            queryset = queryset
        elif user.role == "admin":
            queryset = queryset.filter(section__school__district__admins=user)
        elif user.role == "inspector":
            queryset = queryset.filter(section__school__inspectors=user)
        district = self.request.query_params.get("district")
        school = self.request.query_params.get("school")
        section = self.request.query_params.get("section")
        if section:
            queryset = queryset.filter(section_id=int(section))
        if school:
            queryset = queryset.filter(section__school_id=int(school))
        if district:
            queryset = queryset.filter(section__school__district_id=int(district))
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
