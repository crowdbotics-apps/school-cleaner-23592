# Generated by Django 2.2.19 on 2021-05-04 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0031_auto_20210422_2131'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='cleaning_table',
            field=models.PositiveIntegerField(choices=[(8, 'spray and wipe'), (9, 'pretreat'), (10, 'pads')])
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='cleaning_table_size',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='dust_cleaning',
            field=models.PositiveIntegerField(choices=[(1, 'Dust MOP'), (2, 'Ride on Sweeper')])
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='dust_cleaning_size',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='floor_burnishing',
            field=models.PositiveIntegerField(choices=[(6, 'Ride on burnisher'), (7, 'Electric burnisher')])
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='floor_burnishing_size',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='floor_mopping',
            field=models.PositiveIntegerField(choices=[(3, 'Flat mop'), (4, 'String mop'), (5, 'Ride on scrubber')])
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='floor_mopping_size',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='misting_table',
            field=models.PositiveIntegerField(choices=[(11, 'Electostatic sprayer (if they do it)')])
        ),
        migrations.AddField(
            model_name='equipmentinschoolbuilding',
            name='misting_table_size',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='equipmentinschoolbuilding',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='equipmentinschoolbuilding',
            name='size',
            field=models.PositiveIntegerField(default=1),
        ),
    ]