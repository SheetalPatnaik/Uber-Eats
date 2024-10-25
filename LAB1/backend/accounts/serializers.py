# # serializers.py
# from rest_framework import serializers
# from .models import Profile

# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = ['nickname', 'date_of_birth', 'city', 'state', 'country', 'profile_picture', 'favorites']


# serializers.py
from rest_framework import serializers
from .models import Profile,RestaurantOwner
from django.contrib.auth.models import User

# from .models import CustomUser

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['user_type', 'username', 'email', 'password', 'restaurant_name', 'address', 'upload_image']



class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)  # Get email from User model
    username = serializers.CharField(source='user.username', read_only=True)  # Get username from User model

    class Meta:
        model = Profile
        fields = ['username', 'email', 'nickname', 'date_of_birth', 'city', 'state', 'country', 'profile_picture', 'favorites']

    def validate_date_of_birth(self, value):
        # Custom validation to ensure the date is in the right format if needed
        return value


##menu

# serializers.py
from .models import MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'category', 'name', 'description', 'price', 'image', 'created_at','status']
        extra_kwargs = {
            'image': {'required': False}  # Make image optional
        }



# ##serializing for restaurant infor
# from rest_framework import generics
# from .models import Restaurant
# from .serializers import RestaurantSerializer

# class RestaurantListView(generics.ListAPIView):
#     queryset = Restaurant.objects.all()
#     serializer_class = RestaurantSerializer

# # In your serializer, make sure you include the username
# class RestaurantSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Restaurant
#         fields = ['id', 'restaurant_name', 'address', 'profile_picture', 'username', 'created_at']  # Include username here


# serializers.py
# from rest_framework import serializers
# from .models import Order  # Import your Order model

# class OrderSerializer(serializers.ModelSerializer):
#     customer = serializers.CharField(source='customer.username')  # Get the username instead of the customer ID
#     class Meta:
#         model = Order
#         fields = ['order_id', 'customer', 'order_items', 'order_status', 'created_at']



# from rest_framework import serializers
# from .models import Order

# class OrderSerializer(serializers.ModelSerializer):
#     customer = serializers.CharField(source='customer.username')  # Get the username
#     restaurant = serializers.CharField(source='restaurant.user.username')  # Get the restaurant owner's username
    
#     class Meta:
#         model = Order
#         fields = ['order_id', 'customer', 'restaurant', 'order_items', 'order_status', 'created_at']
#         read_only_fields = ['order_id', 'customer', 'restaurant', 'order_items', 'created_at']  # These fields should remain read-only

#     def update(self, instance, validated_data):
#         instance.order_status = validated_data.get('order_status', instance.order_status)
#         instance.save()
#         return instance




from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(source='customer.username')  # Get the username
    restaurant = serializers.CharField(source='restaurant.user.username')  # Get the restaurant owner's username
    
    class Meta:
        model = Order
        fields = ['order_id', 'customer', 'restaurant', 'order_items', 'order_status', 'created_at']
        read_only_fields = ['order_id', 'customer', 'restaurant', 'order_items', 'created_at']  # These fields should remain read-only

    def update(self, instance, validated_data):
        instance.order_status = validated_data.get('order_status', instance.order_status)
        instance.save()
        return instance







#for cutomer view
# serializers.py

# from rest_framework import serializers
# from .models import Order

# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ['id', 'restaurant_name', 'order_items', 'status']  # Update with actual fields from your model




from rest_framework import serializers
from .models import RestaurantOwner

class RestaurantOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantOwner
        fields = ['restaurant_name', 'address', 'profile_picture']
