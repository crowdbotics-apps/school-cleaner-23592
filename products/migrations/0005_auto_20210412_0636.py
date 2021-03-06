# Generated by Django 2.2.19 on 2021-04-12 06:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('district_services', '0020_auto_20210412_0636'),
        ('products', '0004_productused'),
    ]

    operations = [
        migrations.CreateModel(
            name='RegisteredProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('product_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.ProductType')),
            ],
            options={
                'verbose_name_plural': '2- Products',
                'ordering': ('-created',),
            },
        ),
        migrations.CreateModel(
            name='SectionProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('price', models.FloatField(default=0.0)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.RegisteredProduct')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='district_services.Section')),
            ],
            options={
                'verbose_name_plural': '2- Products In Section',
                'ordering': ('-created',),
            },
        ),
        migrations.AlterField(
            model_name='productused',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products_used', to='products.SectionProduct'),
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]
