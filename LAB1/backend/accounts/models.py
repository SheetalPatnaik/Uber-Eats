from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    favorites = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username


class RestaurantOwner(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    restaurant_id = models.AutoField(primary_key=True)
    restaurant_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='restaurant_pictures/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.restaurant_name
    


class UserProfile(models.Model):
    USER_TYPES = (
        ('customer', 'Customer'),
        ('restaurant_owner', 'Restaurant Owner'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=50, choices=USER_TYPES, default='customer')

    def __str__(self):
        return self.user.username


### for menu
class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('cocktail', 'Cocktail'),
        ('mocktail', 'Mocktail'),
        # Add more categories as needed
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('not_available', 'Not Available'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming the restaurant owner is tied to the User model
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='menu_images/',blank=True, null=True)  # Image upload
    price = models.DecimalField(max_digits=6, decimal_places=2)  # e.g. 9999.99
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='available')  # New status field
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

