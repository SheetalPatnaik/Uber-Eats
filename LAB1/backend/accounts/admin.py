from django.contrib import admin
from .models import Profile,RestaurantOwner,MenuItem,Order


# Register your models here.

# admin.site.register(Profile)

@admin.register(RestaurantOwner)
class RestaurantOwnerAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant_name', 'address', 'created_at')

admin.site.register(Profile)



class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'user', 'status']  # Use 'user' instead of 'owner'
    list_filter = ['category', 'user', 'status']  # Filter by 'user', not 'owner'
    search_fields = ['name', 'description', 'category', 'user__username']  # Allow searching by the username of the user

admin.site.register(MenuItem, MenuItemAdmin)


admin.site.register(Order)

# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'customer_name', 'restaurant', 'order_status', 'created_at')
#     search_fields = ('customer_name', 'restaurant__username')
#     list_filter = ('order_status',)
