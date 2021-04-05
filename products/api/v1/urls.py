from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.api.v1.viewsets import (ProductTypeViewSet, ProductNeededViewSet, ProductViewSet, ProductUsedViewSet)


router = DefaultRouter()
router.register('product-type', ProductTypeViewSet)
router.register('product', ProductViewSet)
router.register('product-needed', ProductNeededViewSet)
router.register('product-used', ProductUsedViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
