# Generated by Django 2.2.17 on 2021-03-12 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210311_0927'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_admin',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_superadmin',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]