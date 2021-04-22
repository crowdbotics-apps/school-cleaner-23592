import random
import string


def district_code_generator(size=5, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def get_duration_components(minutes):
    seconds = 0
    if minutes > 0:
        seconds = minutes * 60
    minutes = seconds // 60
    seconds = seconds % 60
    hours = minutes // 60
    minutes = minutes % 60
    return int(hours), int(minutes), int(seconds)


def duration_string(mint):
    hours, minutes, seconds = get_duration_components(mint)
    du_string = '{:02d}:{:02d}:{:02d}'.format(hours, minutes, seconds)
    return du_string


EQUIPMENT_TYPE = (
    # Dust cleaning
    (1, "Dust MOP"),
    (2, "Ride on Sweeper"),

    # floor cleaning
    (3, "Flat mop"),
    (4, "String mop"),
    (5, "Ride on scrubber"),

    # Floor burnishing
    (6, "Ride on burnisher"),
    (7, "Electric burnisher"),

    # Cleaning tables
    (8, "spray and wipe"),
    (9, "pretreat"),
    (10, "pads"),

    # Misting Tables
    (11, "Electostatic sprayer (if they do it)"),
)

ROOM_TYPES = (
    (1, "Small classroom"),
    (2, "Medium classroom"),
    (3, "Large classroom"),
    (4, "Single bathroom"),
    (5, "Double bathroom"),
    (6, "Triple bathroom"),
    (7, "Quad bathroom"),
    (8, "Hallway"),
    (9, "Cafeteria"),
    (10, "Kitchen"),
    (11, "Office"),
    (12, "Gym"),
    (13, "Auditorium"),
    (14, "Locker room"),
)

HALLWAYS_ID = [5, 2, 1, 4, 3, 6, 7]
CAFETERIA_ID = [5, 2, 1, 4, 3, 6, 7, 8, 9, 10, 11]
SMALL_CLASSROOM_ID = [4, 3]
GYM_ID = [5, 2, 1, 4, 3]


def get_estimated_time(room_type, school_id, square_feet, tables, flushable):
    from district_services.models import EquipmentInSchoolBuilding
    time_in_minute = 0
    school_equipments = EquipmentInSchoolBuilding.objects.filter(school_id=school_id)
    # Hallways passed
    if room_type == 8:
        burnisher = 0
        for item in HALLWAYS_ID:
            equipment = school_equipments.filter(equipment=item).first()
            if equipment:
                if item == 5:
                    time_in_minute += square_feet / (275 * equipment.size/12)
                elif item == 2:
                    time_in_minute += square_feet / (378 * equipment.size/12)
                elif item == 7:
                    burnisher += square_feet / (100 * equipment.size/12)
                elif item == 1:
                    time_in_minute += square_feet / (200 * equipment.size/12)
                elif item == 4:
                    time_in_minute += square_feet / (200 * 12/12)
                elif item == 3:
                    time_in_minute += square_feet / (200 * 18/12)
                elif item == 6:
                    burnisher += square_feet / (200 * equipment.size/12)
        if burnisher > 0:
            time_in_minute += burnisher / 7

    # Cafeteria passed
    elif room_type == 9:
        burnisher = 0
        for item in CAFETERIA_ID:
            equipment = school_equipments.filter(equipment=item).first()
            if equipment:
                if item == 5:
                    time_in_minute += square_feet / (275 * equipment.size/12)
                elif item == 2:
                    time_in_minute += square_feet / (378 * equipment.size/12)
                elif item == 6:
                    burnisher += square_feet / (200 * equipment.size / 12)
                elif item == 7:
                    burnisher += square_feet / (100 * equipment.size/12)
                elif item == 8:
                    time_in_minute += tables * 2
                elif item == 9:
                    time_in_minute += tables * 1.5
                elif item == 10:
                    time_in_minute += tables * 1
                elif item == 11:
                    time_in_minute += tables * 0.2
                elif item == 1:
                    time_in_minute += square_feet / (200 * equipment.size/12)
                elif item == 4:
                    time_in_minute += square_feet / (200 * 12/12)
                elif item == 3:
                    time_in_minute += square_feet / (200 * 18/12)

        if burnisher > 0:
            time_in_minute += burnisher / 7

    # Gym passed
    elif room_type == 12:
        for item in GYM_ID:
            equipment = school_equipments.filter(equipment=item).first()
            if equipment:
                if item == 5:
                    time_in_minute += square_feet / (275 * equipment.size/12)
                elif item == 2:
                    time_in_minute += square_feet / (378 * equipment.size/12)
                else:
                    time_in_minute += square_feet / (200 * equipment.size/12)

    # Office passed
    elif room_type == 11:
        if square_feet < 250:
            time_in_minute += 250 * 0.03
        elif 250 <= square_feet <= 600:
            time_in_minute += 400 * 0.03
        elif 600 < square_feet <= 1000:
            time_in_minute += 800 * 0.03

    # Class room passed (3 types)
    elif room_type in range(1, 4):
        sm_or_fm = 3.6
        sw_or_pt_or_pa = 0.1
        misting = 1

        equipment_string_mop = school_equipments.filter(equipment=4).first()
        equipment_flat_mop = school_equipments.filter(equipment=3).first()
        equipment_spray_or_wipe = school_equipments.filter(equipment=8).first()
        equipment_pre_treat = school_equipments.filter(equipment=9).first()
        equipment_pad = school_equipments.filter(equipment=10).first()
        equipment_misting = school_equipments.filter(equipment=11).first()

        if equipment_string_mop and equipment_string_mop.size > 0:
            sm_or_fm = 6.6
        elif equipment_flat_mop and equipment_flat_mop.size > 0:
            sm_or_fm = 3.6
        if equipment_spray_or_wipe and equipment_spray_or_wipe.size > 0:
            sw_or_pt_or_pa = 0.25
        elif equipment_pre_treat and equipment_pre_treat.size > 0:
            sw_or_pt_or_pa = 0.166
        elif equipment_pad and equipment_pad.size > 0:
            sw_or_pt_or_pa = 0.1
        if equipment_misting and equipment_misting.size > 0:
            misting = 0.02

        if room_type == 1:
            time_in_minute += 9.4 + sm_or_fm + (10 * sw_or_pt_or_pa)+(10 * misting)
        if room_type == 2:
            time_in_minute += 9.4 + sm_or_fm + (20 * sw_or_pt_or_pa)+(20 * misting)
        elif room_type == 3:
            time_in_minute += 9.4 + sm_or_fm + (30 * sw_or_pt_or_pa)+(30 * misting)

    # Bathroom passed (Rest room (3 types))
    elif room_type in range(4, 8):
        if flushable == 0:
            flushable = 1
        cd_sm_or_cd_mt = 1
        equipment_flat_mop = school_equipments.filter(equipment=3).first()
        equipment_string_mop = school_equipments.filter(equipment=4).first()
        if equipment_flat_mop:
            cd_sm_or_cd_mt = 2.983
        elif equipment_string_mop:
            cd_sm_or_cd_mt = 3.916
        time_in_minute += flushable * cd_sm_or_cd_mt + 3

    # TODO: Remaining with kitchen, auditorium and locker room

    return duration_string(time_in_minute + 16)
