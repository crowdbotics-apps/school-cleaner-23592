# Generated by Django 2.2.19 on 2021-04-21 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0024_auto_20210421_1932'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='equipmentinschoolbuilding',
            name='price',
        ),
        migrations.RemoveField(
            model_name='equipmentinschoolbuilding',
            name='unit',
        ),
        migrations.RemoveField(
            model_name='equipmentinschoolbuilding',
            name='updated',
        ),
        migrations.AlterField(
            model_name='equipmentinschoolbuilding',
            name='equipment',
            field=models.PositiveIntegerField(choices=[(1, 'Dust MOP'), (2, 'Ride on Sweeper'), (3, 'Flat mop'), (4, 'String mop'), (5, 'Ride on scrubber'), (6, 'Ride on burnisher'), (7, 'Electric burnisher'), (8, 'spray and wipe'), (9, 'pretreat'), (10, 'pads'), (11, 'Electostatic sprayer (if they do it)')], default=1),
        ),
    ]
