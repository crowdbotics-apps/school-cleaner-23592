from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.api.v1.viewsets import (ProductTypeViewSet, ProductNeededViewSet)


router = DefaultRouter()
router.register('product-type', ProductTypeViewSet)
router.register('product-needed', ProductNeededViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
