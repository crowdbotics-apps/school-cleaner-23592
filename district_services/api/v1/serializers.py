from drf_extra_fields.fields import Base64ImageField
from django.contrib.auth import get_user_model
from rest_framework import serializers

from district_services.api.v1.custom_duration_field import CustomDurationField
from district_services.models import District, SchoolBuilding, Section, Room, \
    EquipmentNeeded, EmployeeInDistrict, EquipmentInSchoolBuilding
from products.api.v1.serializers import SectionProductSerializer, SectionProductCustomizeSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', 'email', "name", "role", "employer_code")


class EmployeeInDistrictSerializer(serializers.ModelSerializer):
    employee_detail = UserSerializer(source="employee", read_only=True, many=False)
    is_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = EmployeeInDistrict
        fields = '__all__'

    def get_is_user(self, obj):
        if obj.employee.id in obj.district.admins.all().values_list("id", flat=True):
            return True
        return False


class DistrictSerializer(serializers.ModelSerializer):
    admin_detail = UserSerializer(source="admins", read_only=True, many=True)
    logo = Base64ImageField()
    buildings = serializers.IntegerField(read_only=True)
    rooms = serializers.IntegerField(read_only=True)
    sq_feet = serializers.IntegerField(read_only=True)

    class Meta:
        model = District
        fields = '__all__'


class SchoolBuildingSerializer(serializers.ModelSerializer):
    inspector_detail = UserSerializer(source="inspectors", read_only=True, many=True)
    district_name = serializers.CharField(source="district.name", read_only=True)
    total_rooms = serializers.IntegerField(read_only=True)
    total_area = serializers.IntegerField(read_only=True)
    total_sections = serializers.IntegerField(read_only=True)
    estimated_time_to_clean = serializers.DurationField(read_only=True)
    image = Base64ImageField()

    class Meta:
        model = SchoolBuilding
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        validated_data = super(SchoolBuildingSerializer, self).validate(attrs)
        district = validated_data.get("district")
        if not user.is_superuser:
            if district and district.admins != user:
                raise serializers.ValidationError({"district": "You don't have permission to perform this action."})
        return validated_data


class SchoolBuildingReportSerializer(serializers.ModelSerializer):
    total_rooms = serializers.IntegerField(read_only=True)
    total_area = serializers.IntegerField(read_only=True)
    total_sections = serializers.IntegerField(read_only=True)
    product_usage_estimation = serializers.IntegerField(read_only=True)
    estimated_time_to_clean = serializers.DurationField(read_only=True)

    class Meta:
        model = SchoolBuilding
        fields = ('total_rooms', 'total_area', 'total_sections', 'estimated_time_to_clean', "product_usage_estimation")


class SectionSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source="school.name", read_only=True)
    people_detail = UserSerializer(source="people", read_only=True, many=True)
    rooms = serializers.IntegerField(read_only=True)
    people_count = serializers.IntegerField(read_only=True)
    square_feet = serializers.IntegerField(read_only=True)
    desks = serializers.IntegerField(read_only=True)
    windows = serializers.IntegerField(read_only=True)
    trash_cans = serializers.IntegerField(read_only=True)
    estimated_time_to_clean = serializers.DurationField(read_only=True)
    products = SectionProductCustomizeSerializer(source="products_in_section", read_only=True, many=True)

    class Meta:
        model = Section
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        validated_data = super(SectionSerializer, self).validate(attrs)
        school = validated_data.get("school")
        if not user.is_superuser:
            if school and school.district.admins != user or school.inspectors != user:
                raise serializers.ValidationError({"school": "You don't have permission to perform this action."})
        return validated_data


# class RoomTypeSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = RoomType
#         fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    room_type_name = serializers.CharField(source="room_type.name", read_only=True)
    total_square_feet = serializers.IntegerField(read_only=True)
    estimated_time_to_clean = CustomDurationField(read_only=True)

    class Meta:
        model = Room
        # exclude = ('estimated_time_to_clean',)
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        validated_data = super(RoomSerializer, self).validate(attrs)
        section = validated_data.get("section")
        if not user.is_superuser:
            if section and section.school.district.admins != user or section.school.inspectors != user:
                raise serializers.ValidationError({"section": "You don't have permission to perform this action."})
        return validated_data


class RoomSpecsSerializer(serializers.Serializer):
    square_feet = serializers.IntegerField(source="square_feet__sum", read_only=True)
    room_type = serializers.IntegerField(read_only=True)
    count = serializers.IntegerField(source="room_type__count", read_only=True)
    estimated_time_to_clean = serializers.DurationField(source="estimated_time_to_clean__sum", read_only=True)
    product_usage = serializers.IntegerField(source="section__product_used_in_section__quantity__sum", read_only=True)

    class Meta:
        fields = '__all__'


class ReportProductNeededSerializer(serializers.Serializer):
    product_type_title = serializers.CharField(source="product__product_type__title", read_only=True)
    product_type = serializers.IntegerField(source="product__product_type_id", read_only=True)
    name = serializers.CharField(source="product__name", read_only=True)
    product_usage = serializers.IntegerField(source="products_used__quantity__sum", read_only=True)

    class Meta:
        fields = '__all__'


# class ToolTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ToolType
#         fields = '__all__'
#
#
# class EquipmentSerializer(serializers.ModelSerializer):
#     tool_title = serializers.CharField(source="tool_type.title", read_only=True)
#
#     class Meta:
#         model = Equipment
#         fields = '__all__'


class EquipmentInSchoolBuildingSerializer(serializers.ModelSerializer):
    equipment_title = serializers.CharField(source="equipment.title", read_only=True)
    tool_title = serializers.CharField(source="equipment.tool_type.title", read_only=True)
    school_name = serializers.CharField(source="school.name", read_only=True)

    class Meta:
        model = EquipmentInSchoolBuilding
        fields = '__all__'


class EquipmentNeededSerializer(serializers.ModelSerializer):
    tool_title = serializers.CharField(source="tool_type.title", read_only=True)
    section_name = serializers.CharField(source="section.name", read_only=True)

    class Meta:
        model = EquipmentNeeded
        fields = '__all__'
