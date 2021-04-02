from django.contrib.auth import get_user_model
from rest_framework import serializers
from inspections.models import Inspection, Parameter, ParameterImage

User = get_user_model()


class InspectionSerializer(serializers.ModelSerializer):
    inspected_by_name = serializers.CharField(source="inspected_by.name", read_only=True)
    room_name = serializers.CharField(source="room.name", read_only=True)
    total_points = serializers.IntegerField(read_only=True)
    inspection_no = serializers.IntegerField(read_only=True)

    class Meta:
        model = Inspection
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        validated_data = super(InspectionSerializer, self).validate(attrs)
        room = validated_data.get("room")
        if not user.is_superuser:
            if room and room.section.school.district.admins != user or room.section.school.inspectors != user:
                raise serializers.ValidationError({"room": "You don't have permission to perform this action."})
        return validated_data


class ParameterOnlyImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = ParameterImage
        fields = ('id', 'image',)


class ParameterSerializer(serializers.ModelSerializer):
    inspection_no = serializers.CharField(source="inspection.inspection_no", read_only=True)
    room_name = serializers.CharField(source="inspection.room.name", read_only=True)
    images = ParameterOnlyImageSerializer(source="images_of_parameter", many=True, read_only=True)

    class Meta:
        model = Parameter
        fields = '__all__'


class ParameterImageSerializer(serializers.ModelSerializer):
    parameter_inspection_no = serializers.CharField(source="parameter.inspection.inspection_no", read_only=True)
    room_name = serializers.CharField(source="parameter.inspection.room.name", read_only=True)
    parameter_title = serializers.CharField(source="parameter.title", read_only=True)

    class Meta:
        model = ParameterImage
        fields = '__all__'

