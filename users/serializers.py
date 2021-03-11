# from rest_framework import serializers
# from rest_auth.serializers import UserDetailsSerializer
# from django.contrib.auth.models import User

# class UserSerializer(UserDetailsSerializer):

#     phone = serializers.CharField(source="User.phone")

#     class Meta(UserDetailsSerializer.Meta):
#         fields = UserDetailsSerializer.Meta.fields + ('phone',)

#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('userprofile', {})

#         instance = super(UserSerializer, self).update(instance, validated_data)

#         # get and update user profile
#         profile = instance.userprofile
#         if profile_data and company_name:
#             profile.save()
#         return instance
