# Generated by Django 2.2.19 on 2021-04-07 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0014_auto_20210331_0733'),
    ]

    operations = [
        migrations.AlterField(
            model_name='district',
            name='code',
            field=models.CharField(max_length=5, verbose_name='District Code'),
        ),
    ]