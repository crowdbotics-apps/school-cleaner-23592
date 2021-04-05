from django.contrib.auth import get_user_model
from rest_framework import serializers
from products.models import ProductType, ProductNeeded, Product, ProductUsed

User = get_user_model()


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductNeededSerializer(serializers.ModelSerializer):
    inspector_name = serializers.CharField(source="inspector.name", read_only=True)
    section_name = serializers.CharField(source="section.name", read_only=True)
    product_type_title = serializers.CharField(source="product_type.title", read_only=True)
    total_price = serializers.IntegerField(read_only=True)

    class Meta:
        model = ProductNeeded
        fields = '__all__'


class ProductUsedSerializer(serializers.ModelSerializer):
    section_name = serializers.CharField(source="section.name", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = ProductUsed
        fields = '__all__'
