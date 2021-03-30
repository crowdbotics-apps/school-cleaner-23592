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
    queryset = ProductNeeded.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, ProductNeededPermission]

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        # if user.is_superuser or user.role:
        #     queryset = queryset.filter()
        return queryset


class InspectionViewSet(viewsets.ModelViewSet):
    serializer_class = InspectionSerializer
    queryset = Inspection.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated, InspectionPermission]

    def get_queryset(self):
        queryset = self.queryset
        return queryset
