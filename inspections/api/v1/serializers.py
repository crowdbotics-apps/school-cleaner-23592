from django.contrib.auth import get_user_model
from rest_framework import serializers
from inspections.models import ProductType, ProductNeeded, Inspection

User = get_user_model()


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'


class ProductNeededSerializer(serializers.ModelSerializer):
    inspector_name = serializers.CharField(source="inspector.name", read_only=True)
    section_name = serializers.CharField(source="section.name", read_only=True)
    product_type_title = serializers.CharField(source="product_type.title", read_only=True)

    class Meta:
        model = ProductNeeded
        fields = '__all__'


class InspectionSerializer(serializers.ModelSerializer):
    inspected_by_name = serializers.CharField(source="inspected_by.name", read_only=True)
    room_name = serializers.CharField(source="room.name", read_only=True)

    class Meta:
        model = Inspection
        fields = '__all__'

