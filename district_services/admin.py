from django.contrib import admin

from district_services.models import District, SchoolBuilding, Section, Room, RoomType, Equipment, ToolType, \
    EmployeeInDistrict, EquipmentInSchoolBuilding, EquipmentNeeded


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'updated', 'created']
    list_per_page = 10


@admin.register(EmployeeInDistrict)
class EmployeeInDistrictAdmin(admin.ModelAdmin):
    list_display = ['district', 'employee', 'created']
    list_per_page = 10


@admin.register(SchoolBuilding)
class SchoolBuildingAdmin(admin.ModelAdmin):
    list_display = ['name', 'updated', 'created']
    list_per_page = 10


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'school', 'created']
    list_per_page = 10


@admin.register(EquipmentInSchoolBuilding)
class EquipmentInSchoolBuildingAdmin(admin.ModelAdmin):
    list_display = ['equipment', 'school', 'size', 'quantity', 'price', 'created']
    list_per_page = 10


@admin.register(ToolType)
class ToolTypeAdmin(admin.ModelAdmin):
    list_display = ['title', 'updated', 'created']
    list_per_page = 10


@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'tool_type', 'created']
    list_per_page = 10


@admin.register(EquipmentNeeded)
class EquipmentNeededAdmin(admin.ModelAdmin):
    list_display = ['section', 'equipment', 'created']
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
