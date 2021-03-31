from django.contrib import admin

from inspections.models import ProductType, ProductNeeded, Inspection, Parameter, ParameterImage


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated', 'created']
    list_per_page = 10


@admin.register(ProductNeeded)
class ProductNeededAdmin(admin.ModelAdmin):
    list_display = ['inspector', 'section', 'quantity', 'product_type', 'price_per_unit', 'updated', 'created']
    list_per_page = 10


@admin.register(Inspection)
class InspectionAdmin(admin.ModelAdmin):
    list_display = ['inspection_no', 'inspected_by', 'grade', 'room', 'updated', 'created']
    list_per_page = 10


@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    list_display = ['title', 'inspection', 'status', 'points', 'updated', 'created']
    list_per_page = 10


@admin.register(ParameterImage)
class ParameterImageAdmin(admin.ModelAdmin):
    list_display = ['parameter', 'updated', 'created']
    list_per_page = 10
