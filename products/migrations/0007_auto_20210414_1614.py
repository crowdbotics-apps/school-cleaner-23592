# Generated by Django 2.2.19 on 2021-04-14 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_auto_20210412_0653'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productused',
            options={'ordering': ('-created',), 'verbose_name_plural': '5- Product Used'},
        ),
    ]
