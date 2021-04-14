from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.api.v1.viewsets import (ProductTypeViewSet, ProductNeededViewSet, SectionProductViewSet,
                                      ProductUsedViewSet, RegisteredProductViewSet)


router = DefaultRouter()
router.register('product-type', ProductTypeViewSet)
router.register('product', RegisteredProductViewSet)
router.register('section-product', SectionProductViewSet)
router.register('product-needed', ProductNeededViewSet)
router.register('product-used', ProductUsedViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
