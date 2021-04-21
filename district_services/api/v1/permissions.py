from rest_framework.permissions import BasePermission


SAFE_METHODS_FOR_ALL_USER = ["OPTIONS", "GET", "HEAD"]


class DistrictUserPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.method in SAFE_METHODS_FOR_ALL_USER:
            return True
        else:
            return False


class SchoolBuildingPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False


class SectionPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False


class RoomTypePermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False


class RoomPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False


class ToolTypePermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.user.role == "inspector" or request.user.role == "admin":
            if request.method in ["OPTIONS", "GET", "POST", "HEAD"]:
                return True
            return False
        return False


class EquipmentInSectionPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.user.role == "inspector" or request.user.role == "admin":
            return True
        else:
            return False
