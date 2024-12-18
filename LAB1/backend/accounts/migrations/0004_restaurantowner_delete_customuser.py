# Generated by Django 5.1.1 on 2024-10-08 08:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0003_customuser"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="RestaurantOwner",
            fields=[
                ("restaurant_id", models.AutoField(primary_key=True, serialize=False)),
                ("restaurant_name", models.CharField(max_length=255)),
                ("address", models.CharField(max_length=255)),
                (
                    "profile_picture",
                    models.ImageField(
                        blank=True, null=True, upload_to="restaurant_pictures/"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="CustomUser",
        ),
    ]
