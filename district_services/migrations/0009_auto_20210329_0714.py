# Generated by Django 2.2.19 on 2021-03-29 07:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('district_services', '0008_auto_20210329_0645'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='cleaners',
        ),
        migrations.AddField(
            model_name='room',
            name='cleaner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cleaner_of_room', to=settings.AUTH_USER_MODEL),
        ),
    ]
