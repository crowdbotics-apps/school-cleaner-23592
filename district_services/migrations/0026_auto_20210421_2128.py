# Generated by Django 2.2.19 on 2021-04-21 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0025_auto_20210421_2121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipmentinschoolbuilding',
            name='equipment',
            field=models.PositiveIntegerField(choices=[(1, 'Dust MOP'), (2, 'Ride on Sweeper'), (3, 'Flat mop'), (4, 'String mop'), (5, 'Ride on scrubber'), (6, 'Ride on burnisher'), (7, 'Electric burnisher'), (8, 'spray and wipe'), (9, 'pretreat'), (10, 'pads'), (11, 'Electostatic sprayer (if they do it)')]),
        ),
        migrations.AlterField(
            model_name='room',
            name='room_type',
            field=models.PositiveIntegerField(choices=[(1, 'Small classroom'), (2, 'Medium classroom'), (3, 'Large classroom'), (4, 'Single bathroom'), (5, 'Double bathroom'), (6, 'Triple bathroom'), (7, 'Quad bathroom'), (8, 'Hallway'), (9, 'Cafeteria'), (10, 'Kitchen'), (11, 'Office'), (12, 'Gym'), (13, 'Auditorium'), (14, 'Locker room')]),
        ),
    ]
