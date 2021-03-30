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
        verbose_name_plural = "Inspections"
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
        verbose_name_plural = "Inspections"
        ordering = ('-created',)


class Inspection(models.Model):
    inspection_no = models.PositiveIntegerField(default=1000)
    inspected_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name="inspection_user")
    grade = models.PositiveIntegerField()
    room = models.ForeignKey("district_services.Room",
                             on_delete=models.SET_NULL, null=True, blank=True,
                             related_name="inspection_of_rooms")

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.inspected_by)

    class Meta:
        verbose_name_plural = "Inspections"
        ordering = ('-created',)


class Parameter(models.Model):
    INSPECTION_STATUS = (
        (0, "Fail"),
        (1, "Pass"),
    )
    title = models.CharField(max_length=255)
    inspection = models.ForeignKey(Inspection, on_delete=models.CASCADE, related_name="inspection_parameters")
    status = models.PositiveIntegerField(choices=INSPECTION_STATUS, default=1)
    note = models.TextField()
    points = models.PositiveIntegerField(default=0)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.inspection)

    class Meta:
        verbose_name_plural = "2- Inspection Parameters"
        ordering = ('-created',)


class ParameterImage(models.Model):
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE, related_name="images_of_parameter")
    image = models.ImageField(upload_to="inspection_images")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.parameter)

    class Meta:
        verbose_name_plural = "3- Parameter Images"
        ordering = ('-created',)


