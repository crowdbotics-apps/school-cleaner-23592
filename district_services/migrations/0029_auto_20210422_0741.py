# Generated by Django 2.2.19 on 2021-04-22 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0028_auto_20210422_0739'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='clean_up_time',
            field=models.PositiveIntegerField(default=8),
        ),
        migrations.AddField(
            model_name='room',
            name='preparation_time',
            field=models.PositiveIntegerField(default=8),
        ),
    ]
