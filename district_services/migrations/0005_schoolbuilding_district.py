# Generated by Django 2.2.19 on 2021-03-28 15:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0004_schoolbuilding'),
    ]

    operations = [
        migrations.AddField(
            model_name='schoolbuilding',
            name='district',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='district_services.District'),
            preserve_default=False,
        ),
    ]