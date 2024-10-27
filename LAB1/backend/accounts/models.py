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


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)  # Auto-incrementing order ID
    item_name = models.CharField(max_length=255)  # Name of the ordered item
    quantity = models.PositiveIntegerField()  # Quantity of the item
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the item
    total_price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)  # Total price of the order (quantity * price)
    restaurant = models.ForeignKey(RestaurantOwner, on_delete=models.CASCADE)  # Link to RestaurantOwner model
    order_status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Preparing', 'Preparing'), ('Delivered', 'Delivered')])  # Order status with choices

    # def save(self, *args, **kwargs):
    #     # Automatically calculate total price before saving
    #     self.total_price = self.quantity * self.price
    #     super(Order, self).save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.order_id} - {self.item_name} ({self.quantity})"



class UserProfile(models.Model):
    USER_TYPES = (
        ('customer', 'Customer'),
        ('restaurant_owner', 'Restaurant Owner'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=50, choices=USER_TYPES, default='customer')

    def __str__(self):
        return self.user.username

class Dish(models.Model):
    CATEGORY_CHOICES = (
        ('Appetizer', 'Appetizer'),
        ('Main Course', 'Main Course'),
        ('Dessert', 'Dessert'),
        ('Beverage', 'Beverage'),
        ('Soup', 'Soup'),
        ('Salad', 'Salad'),
        ('Pizza', 'Pizza'),
    )

    # dish_id = models.AutoField(primary_key=True)
    id = models.AutoField(primary_key=True)
    dish_name = models.CharField(max_length=255)
    restaurant = models.ForeignKey(RestaurantOwner, on_delete=models.CASCADE, related_name='dishes')  # Add related_name='dishes'
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.dish_name} - {self.restaurant.restaurant_name} (${self.price})"
