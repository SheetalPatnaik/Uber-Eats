# Generated by Django 5.1.1 on 2024-10-10 20:08

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0007_menuitem_status"),
    ]

    operations = [
        migrations.RenameField(
            model_name="menuitem",
            old_name="owner",
            new_name="user",
        ),
    ]