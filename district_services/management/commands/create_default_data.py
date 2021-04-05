from django.core.management.base import BaseCommand

from district_services.models import ToolType


class Command(BaseCommand):
    def create_tool_type_data(self):
        default_tool_types = [
            "Auto Scrubber",
            "Dust Mop/Sweeper",
            "Floor Machine",
            "Burnisher",
            "Dispenser",
            "Micro Fiber Cloths",
            "Electrostatic Sprayer",
            "Duster",
        ]
        tool_type_create_list = []
        print(len(default_tool_types))
        if not ToolType.objects.filter(title=default_tool_types[0]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[0]))
        if not ToolType.objects.filter(title=default_tool_types[1]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[1]))
        if not ToolType.objects.filter(title=default_tool_types[2]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[2]))
        if not ToolType.objects.filter(title=default_tool_types[3]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[3]))
        if not ToolType.objects.filter(title=default_tool_types[4]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[4]))
        if not ToolType.objects.filter(title=default_tool_types[5]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[5]))
        if not ToolType.objects.filter(title=default_tool_types[6]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[6]))
        if not ToolType.objects.filter(title=default_tool_types[7]).exists():
            tool_type_create_list.append(ToolType(title=default_tool_types[7]))

        ToolType.objects.bulk_create(tool_type_create_list)
        print("default tool types created successfully")

    def handle(self, *args, **kwargs):
        self.create_tool_type_data()
