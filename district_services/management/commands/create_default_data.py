from django.core.management.base import BaseCommand

from district_services.models import ToolType, Equipment, RoomType


class Command(BaseCommand):
    def create_tool_type_data(self):
        print("creating tool types")
        DEFAULT_TOOL_TYPES = [
            "Dust Cleaning",
            "Floor Cleaning",
            "Floor Burnishing",
            "Cleaning Tables",
            "Misting Tables",
        ]
        tool_type_create_list = []

        for item in DEFAULT_TOOL_TYPES:
            if not ToolType.objects.filter(title=item):
                tool_type_create_list.append(ToolType(title=item))
        if tool_type_create_list:
            ToolType.objects.bulk_create(tool_type_create_list)
            print(f"{len(tool_type_create_list)} tool types created successfully")
        else:
            print("no tool types to create")

    def create_equipment_data(self):
        print("creating equipments")
        DUST_CLEANING = ["Dust mop", "Ride on sweeper"]
        FLOOR_CLEANING = ["Flat mop", "String mop", "Ride on scrubber"]
        FLOOR_BURNISHING = ["Ride on burnisher", "Electric burnisher"]
        CLEANING_TABLES = ["spray and wipe", "pretreat", "pads"]
        MISTING_TABLES = ["Electostatic sprayer (if they do it)"]

        # Equipments
        equipment_create_list = []
        tool_types = ToolType.objects.all()
        for tool_type in tool_types:
            filter_equipment = Equipment.objects.filter(tool_type_id=tool_type.pk)
            if tool_type.title == "Dust Cleaning":
                for item in DUST_CLEANING:
                    if not filter_equipment.filter(title=item):
                        equipment_create_list.append(Equipment(tool_type_id=tool_type.pk, title=item))

            elif tool_type.title == "Floor Cleaning":
                for item in FLOOR_CLEANING:
                    if not filter_equipment.filter(title=item):
                        equipment_create_list.append(Equipment(tool_type_id=tool_type.pk, title=item))

            elif tool_type.title == "Floor Burnishing":
                for item in FLOOR_BURNISHING:
                    if not filter_equipment.filter(title=item):
                        equipment_create_list.append(Equipment(tool_type_id=tool_type.pk, title=item))

            elif tool_type.title == "Cleaning Tables":
                for item in CLEANING_TABLES:
                    if not filter_equipment.filter(title=item):
                        equipment_create_list.append(Equipment(tool_type_id=tool_type.pk, title=item))

            elif tool_type.title == "Misting Tables":
                for item in MISTING_TABLES:
                    if not filter_equipment.filter(title=item):
                        equipment_create_list.append(Equipment(tool_type_id=tool_type.pk, title=item))

        if equipment_create_list:
            Equipment.objects.bulk_create(equipment_create_list)
            print(f"{len(equipment_create_list)} equipments created successfully.")
        else:
            print("no equipment to create.")

    def create_room_types(self):
        print("creating room types")
        DEFAULT_ROOM_TYPES = ["classroom", "bathroom", "hallway", "cafeteria", "kitchen", "office",
                              "gym", "auditorium", "locker room"]
        room_type_create_list = []
        for item in DEFAULT_ROOM_TYPES:
            room_type = RoomType.objects.filter(name=item)
            if not room_type:
                room_type_create_list.append(RoomType(name=item))
        if room_type_create_list:
            RoomType.objects.bulk_create(room_type_create_list)
            print(f"{len(room_type_create_list)} room types created successfully.")
        else:
            print("no room type to create.")

    def handle(self, *args, **kwargs):
        self.create_tool_type_data()
        self.create_equipment_data()
        self.create_room_types()
