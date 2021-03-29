import json
from drf_extra_fields.fields import Base64ImageField
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from district_services.models import District, SchoolBuilding, Section, Room, RoomType

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', 'email')


class DistrictSerializer(serializers.ModelSerializer):
    admin_detail = UserSerializer(source="admins", read_only=True, many=True)
    logo = Base64ImageField()

    class Meta:
        model = District
        fields = '__all__'


class SchoolBuildingSerializer(serializers.ModelSerializer):
    inspector_detail = UserSerializer(source="inspectors", read_only=True, many=True)
    district_name = serializers.CharField(source="district.name", read_only=True)
    total_rooms = serializers.IntegerField(read_only=True)
    total_area = serializers.IntegerField(read_only=True)
    image = Base64ImageField()

    class Meta:
        model = SchoolBuilding
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source="school.name", read_only=True)
    people_detail = UserSerializer(source="people", read_only=True, many=True)
    rooms = serializers.IntegerField(read_only=True)
    people_count = serializers.IntegerField(read_only=True)
    square_feet = serializers.IntegerField(read_only=True)
    desks = serializers.IntegerField(read_only=True)
    windows = serializers.IntegerField(read_only=True)
    trash_cans = serializers.IntegerField(read_only=True)

    class Meta:
        model = Section
        fields = '__all__'


class RoomTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomType
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    room_type_name = serializers.CharField(source="room_type.name", read_only=True)
    total_square_feet = serializers.IntegerField(read_only=True)

    class Meta:
        model = Room
        fields = '__all__'
