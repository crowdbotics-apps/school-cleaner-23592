from django.contrib import admin

from district_services.models import District, SchoolBuilding, Section, Room, RoomType, Equipment


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'updated', 'created']
    list_per_page = 10


@admin.register(SchoolBuilding)
class SchoolBuildingAdmin(admin.ModelAdmin):
    list_display = ['name', 'updated', 'created']
    list_per_page = 10


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'school', 'paper_towel_dispensers', 'toiler_tissue_dispensers', 'hand_soap_dispensers',
                    'hand_sanitizer_dispensers', 'created']
    list_per_page = 10


@admin.register(Equipment)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['tool_type', 'section', 'size', 'quantity', 'price', 'created']
    list_per_page = 10


@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'updated', 'created']
    list_per_page = 10


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'section', 'room_type', 'estimated_time_to_clean', 'square_feet', 'desks', 'windows',
                    'trash_cans', 'created']
    list_per_page = 10
