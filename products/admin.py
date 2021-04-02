from django.contrib import admin
from products.models import ProductType, ProductNeeded


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated', 'created']
    list_per_page = 10


@admin.register(ProductNeeded)
class ProductNeededAdmin(admin.ModelAdmin):
    list_display = ['inspector', 'section', 'quantity', 'product_type', 'price_per_unit', 'updated', 'created']
    list_per_page = 10
