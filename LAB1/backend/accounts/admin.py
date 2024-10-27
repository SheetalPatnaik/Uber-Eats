from django.contrib import admin
from .models import Profile,RestaurantOwner,Order,Dish


# Register your models here.

# admin.site.register(Profile)

@admin.register(RestaurantOwner)
class RestaurantOwnerAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant_name', 'address', 'created_at')

admin.site.register(Profile)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'item_name', 'quantity', 'price', 'total_price', 'restaurant', 'order_status')
    readonly_fields = ('total_price',)  # Total price is automatically calculated, so it should be read-only
    list_filter = ('restaurant', 'order_status')  # Filter by restaurant and order status
    search_fields = ('item_name', 'restaurant__restaurant_name')  # Search by item name and restaurant name

    def save_model(self, request, obj, form, change):
        # Automatically calculate the total price before saving
        obj.total_price = obj.quantity * obj.price
        super().save_model(request, obj, form, change)

# Register the Order model
admin.site.register(Order, OrderAdmin)

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('id','dish_name', 'restaurant', 'price', 'category')
    list_filter = ('restaurant', 'category')
    search_fields = ('dish_name', 'restaurant__restaurant_name')

