from rest_framework.permissions import BasePermission


SAFE_METHODS_FOR_ALL_USER = ["OPTIONS", "GET"]


class ProductTypePermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        elif request.method in SAFE_METHODS_FOR_ALL_USER:
            return True


class ProductNeededPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.role == "admin":
            return True
        elif request.user.role == "inspector":
            return True
        else:
            return False
