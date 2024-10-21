# # serializers.py
# from rest_framework import serializers
# from .models import Profile

# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = ['nickname', 'date_of_birth', 'city', 'state', 'country', 'profile_picture', 'favorites']


# serializers.py
from rest_framework import serializers
from .models import Profile
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
