from django.shortcuts import render,redirect
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.models import User
from .models import Profile,RestaurantOwner,UserProfile
from .forms import ProfileForm
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .serializers import ProfileSerializer
import requests

from django.contrib.auth.hashers import make_password
from .models import MenuItem, User



@api_view(['POST'])
def signup(request):
    user_type = request.data.get('user_type')  # Field to determine the user type
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Additional fields for restaurant owner
    restaurant_name = request.data.get('restaurant_name')
    address = request.data.get('address')
    profile_picture = request.data.get('profile_picture')

    # Validate that the basic fields are provided
    if not username or not email or not password or not user_type:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Check for existing username and email
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists. Try another one!"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered. Please Login!"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the new user
    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    # Create the user profile and set the user type
    user_profile = UserProfile(user=user, user_type=user_type)
    user_profile.save()

    # If the user is a restaurant owner, save the restaurant owner details
    if user_type == 'restaurant_owner':
        # Validate that restaurant-specific fields are provided
        if not restaurant_name or not address:
            return Response({"error": "Restaurant name and address are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the RestaurantOwner instance and associate with the user
        restaurant_owner = RestaurantOwner(
            user=user,  # Link to the created user
            restaurant_name=restaurant_name,
            address=address,
            profile_picture=profile_picture  # Make sure this is handled appropriately
        )
        restaurant_owner.save()

    return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)


# user_profile = UserProfile.objects.get(user=request.user)
# print(user_profile.user_type)





@api_view(['POST'])
def rest_login(request):
    rest_username = request.data.get('username')  # Renamed variable for clarity
    password = request.data.get('password')

    # Logic to check if the user is a restaurant owner
    rest_user = authenticate(username=rest_username, password=password)  # Renamed variable for clarity
    if rest_user is not None:
        # Check if this user is a restaurant owner
        if hasattr(rest_user, 'restaurantowner'):  # Ensure the user has a restaurant owner profile
            login(request, rest_user)  # Log in the restaurant owner
            return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Not authorized as restaurant owner."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful!'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)



# Dashboard view
def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'accounts/dashboard.html')



# Logout view
def logout_user(request):
    logout(request)  # This will log out the user
    return redirect('login')  # Redirect to login page after logout



@login_required
@api_view(['GET', 'POST'])
def profile_view(request):
    try:
        profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
        profile = Profile(user=request.user)  # Create a new profile if it doesn't exist
        profile.save()

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'POST':
        print("Request Headers:", request.headers)  # Log the request headers
        print("CSRF Token from request:", request.META.get('HTTP_X_CSRFTOKEN'))
        
        serializer = ProfileSerializer(profile, data=request.data, partial=True)  # Partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# views.py
# from django.http import JsonResponse
from .models import RestaurantOwner
import logging

logger = logging.getLogger(__name__)

def search_restaurants(request):
    try:
        restaurants = RestaurantOwner.objects.all().values('restaurant_name', 'profile_picture', 'address','created_at','user__username')
        logger.info(f"Fetched {len(restaurants)} restaurants")
        return JsonResponse(list(restaurants), safe=False)
    except Exception as e:
        logger.error(f"Error fetching restaurants: {e}")
        return JsonResponse({'error': str(e)}, status=500)



## menu iems view
from .models import MenuItem
from .serializers import MenuItemSerializer

@login_required
def add_menu_item(request):
    if request.method == 'POST':
        print("Logged-in user:", request.user)
        print(f"Logged-in user: {request.user} (ID: {request.user.id})")

        # Log the POST data
        print("POST data received:", request.POST)

        # Extract form data
        category = request.POST.get('category')
        name = request.POST.get('name')
        description = request.POST.get('description')
        price = request.POST.get('price')
        status = request.POST.get('status')
        image = request.FILES.get('image')

    try:
        # Create or update the MenuItem
        menu_item = MenuItem(
            category=category,
            name=name,
            description=description,
            price=price,
            status=status,
            image=image,
            user=request.user  # Set the logged-in user as the owner
        )
        menu_item.save()
        return Response({'message': 'Menu item added successfully', 'item': MenuItemSerializer(menu_item).data})
    except Exception as e:
        print(f"Error saving menu item: {str(e)}")  # Log the error
        return Response({'error': str(e)}, status=400)




##fetch menu items
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_menu_items(request):
    user = request.user  # Get the logged-in user
    items = MenuItem.objects.filter(user=user)  # Only get items for the logged-in user
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)



## PUT request to update data when user updates menu items
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_menu_item(request, pk):
    user = request.user
    try:
        item = MenuItem.objects.get(id=pk, user=user)  # Make sure the user owns the item
    except MenuItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
    print(request.data)
    serializer = MenuItemSerializer(item, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()  # Save updated item
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


##get menu for customer
from django.shortcuts import get_object_or_404
from .models import MenuItem, RestaurantOwner
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def get_menu_for_cust(request, username):
    """
    Fetch menu items for the restaurant based on the restaurant owner's username.
    """
    logger.info(f"Fetching menu for restaurant owner with username: {username}")

    # Get the RestaurantOwner based on the username of the restaurant owner
    try:
        restaurant_owner = get_object_or_404(RestaurantOwner, user__username=username)
        print(f"Found restaurant owner: {restaurant_owner}")
    except Exception as e:
        print(f"Error fetching restaurant owner: {e}")
        return JsonResponse({'error': 'Restaurant owner not found'}, status=404)

    # Filter MenuItems where the user (restaurant owner) matches
    menu_items = MenuItem.objects.filter(user=restaurant_owner.user)

    if not menu_items:
        print("No menu items found for this restaurant owner.")
        return JsonResponse({'error': 'No menu items found'}, status=404)

    # Prepare menu data to send as JSON response
    menu_data = [
        {
            'name': item.name,
            'category': item.category,
            'description': item.description,
            'price': item.price,
            'status': item.status,
            'image': item.image.url if item.image else None,
        }
        for item in menu_items
    ]
    
    print(f"Menu items fetched: {menu_data}")  # Debug print

    # Return the menu data as a JSON response
    return JsonResponse(menu_data, safe=False)




