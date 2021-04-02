from rest_framework.permissions import BasePermission


SAFE_METHODS_FOR_ALL_USER = ["OPTIONS", "GET"]


class InspectionPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False


class ParameterPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False
