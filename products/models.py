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


class RegisteredProduct(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.PROTECT)
    name = models.CharField(max_length=255)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "2- Register Products"
        ordering = ("-created",)


class SectionProduct(models.Model):
    product = models.ForeignKey(RegisteredProduct, on_delete=models.PROTECT, related_name="section_products")
    quantity = models.PositiveIntegerField(default=0)
    price = models.FloatField(default=0.0)

    section = models.ForeignKey("district_services.Section", on_delete=models.CASCADE,
                                related_name="products_in_section")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product.name)

    class Meta:
        verbose_name_plural = "3- Products In Section"
        ordering = ("-created",)


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
        verbose_name_plural = "4- Product Needed"
        ordering = ('-created',)


class ProductUsed(models.Model):
    section = models.ForeignKey("district_services.Section", on_delete=models.SET_NULL,
                                related_name="product_used_in_section", null=True, blank=True)
    quantity = models.PositiveIntegerField()
    product = models.ForeignKey(SectionProduct, on_delete=models.CASCADE, related_name="products_used")

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product)

    class Meta:
        verbose_name_plural = "5- Product Used"
        ordering = ('-created',)
