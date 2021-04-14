from django.contrib import admin
from products.models import ProductType, ProductNeeded, RegisteredProduct, SectionProduct, ProductUsed


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated', 'created']
    list_per_page = 10


@admin.register(RegisteredProduct)
class RegisteredProductAdmin(admin.ModelAdmin):
    list_display = ['product_type', 'name', 'created']
    list_per_page = 10


@admin.register(SectionProduct)
class SectionProductAdmin(admin.ModelAdmin):
    list_display = ['product', 'section', 'quantity', 'price', 'created']
    list_per_page = 10


@admin.register(ProductNeeded)
class ProductNeededAdmin(admin.ModelAdmin):
    list_display = ['inspector', 'section', 'quantity', 'product_type', 'price_per_unit', 'updated', 'created']
    list_per_page = 10


@admin.register(ProductUsed)
class ProductUsedAdmin(admin.ModelAdmin):
    list_display = ['section', 'quantity', 'product', 'created']
    list_per_page = 10

