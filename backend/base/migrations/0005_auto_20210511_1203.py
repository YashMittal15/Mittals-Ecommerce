# Generated by Django 3.1.7 on 2021-05-11 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_auto_20210402_1949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/forProject.jpg', null=True, upload_to=''),
        ),
    ]
