# Generated by Django 3.1.7 on 2021-03-14 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20210314_1340'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='Image',
            new_name='image',
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
