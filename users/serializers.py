from rest_frameworks import serializers
from rest_auth.serializers import UserDetailsSerializer


class UserSerializer(UserDetailsSerializer):

    class Meta: