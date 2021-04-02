# Generated by Django 2.2.19 on 2021-03-29 07:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0010_auto_20210329_0731'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections_in_school', to='district_services.SchoolBuilding'),
            preserve_default=False,
        ),
    ]
