# Generated by Django 4.2.16 on 2024-10-10 21:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0008_alter_dish_restaurant"),
    ]

    operations = [
        migrations.RenameField(
            model_name="dish",
            old_name="dish_id",
            new_name="id",
        ),
    ]
