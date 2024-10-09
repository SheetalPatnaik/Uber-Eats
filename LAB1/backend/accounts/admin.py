from django.contrib import admin
from .models import Profile,RestaurantOwner


# Register your models here.

# admin.site.register(Profile)

@admin.register(RestaurantOwner)
class RestaurantOwnerAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant_name', 'address', 'created_at')

admin.site.register(Profile)