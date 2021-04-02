from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class ProductType(models.Model):
    title = models.CharField(max_length=255)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "1- Product Type"
        ordering = ('-created',)


class ProductNeeded(models.Model):
    inspector = models.ForeignKey(User, on_delete=models.PROTECT, related_name="inspector_to_product_needed")
    section = models.ForeignKey("district_services.Section", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, related_name="product_types")
    price_per_unit = models.FloatField()

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product_type)

    class Meta:
        verbose_name_plural = "2- Product Needed"
        ordering = ('-created',)
