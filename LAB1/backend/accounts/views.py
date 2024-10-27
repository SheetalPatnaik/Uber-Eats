from django.shortcuts import render,redirect
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.models import User
from .models import Profile,RestaurantOwner,UserProfile,Order
from .forms import ProfileForm
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .serializers import ProfileSerializer
# import requests

from django.contrib.auth.hashers import make_password

# Signup view
# @csrf_exempt
# @api_view(['POST'])
# def signup(request):
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password')

#     # Validate that all fields are provided
#     if not username or not email or not password:
#         return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

#     # Check for existing username
#     if User.objects.filter(username=username).exists():
#         return Response({"error": "Username already exists. Try another one!"}, status=status.HTTP_400_BAD_REQUEST)

#     # Check for existing email
#     if User.objects.filter(email=email).exists():
#         return Response({"error": "Email already registered. Please Login!"}, status=status.HTTP_400_BAD_REQUEST)

#     # Create the new user
#     user = User.objects.create_user(username=username, email=email, password=password)
#     user.save()

#     return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)




# @api_view(['POST'])
# def signup(request):
#     user_type = request.data.get('user_type')  # Field to determine the user type
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password')

#     # Additional fields for restaurant owner
#     restaurant_name = request.data.get('restaurant_name')
#     address = request.data.get('address')
#     profile_picture = request.data.get('profile_picture')

#     # Validate that the basic fields are provided
#     if not username or not email or not password or not user_type:
#         return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

#     # Check for existing username and email
#     if User.objects.filter(username=username).exists():
#         return Response({"error": "Username already exists. Try another one!"}, status=status.HTTP_400_BAD_REQUEST)
    
#     if User.objects.filter(email=email).exists():
#         return Response({"error": "Email already registered. Please Login!"}, status=status.HTTP_400_BAD_REQUEST)

#     # Create the new user
#     user = User.objects.create_user(username=username, email=email, password=password)
#     user.save()

#     # If the user is a restaurant owner, save the restaurant owner details
#     if user_type == 'restaurant_owner':
#         # Validate that restaurant-specific fields are provided
#         if not restaurant_name or not address:
#             return Response({"error": "Restaurant name and address are required."}, status=status.HTTP_400_BAD_REQUEST)

#         # Create the RestaurantOwner instance and associate with the user
#         restaurant_owner = RestaurantOwner(
#             user=user,  # Link to the created user
#             restaurant_name=restaurant_name,
#             address=address,
#             profile_picture=profile_picture  # Make sure this is handled appropriately
#         )
#         restaurant_owner.save()

#     return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)




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


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Dish
from .serializers import DishSerializer


@api_view(['POST'])
def rest_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        if hasattr(user, 'restaurantowner'):  # Check if the user is a restaurant owner
            login(request, user)  # Creates a session for the user
            return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Not authorized as restaurant owner."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

# Create View for Adding Dishes:
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Dish
from .serializers import DishSerializer

@api_view(['POST'])
def add_dish(request):
    try:
        dish_name = request.data['dish_name']  # This should match the key from the frontend
        price = request.data['price']
        category = request.data['category']
        
        restaurant_owner = RestaurantOwner.objects.get(user=request.user)
        dish = Dish.objects.create(
            dish_name=dish_name,
            price=price,
            category=category,
            restaurant=restaurant_owner
        )
        dish.save()
        return Response({'message': 'Dish added successfully'}, status=200)
    except KeyError as e:
        return Response({'error': f'Missing field: {str(e)}'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Dish
from .serializers import DishSerializer

@api_view(['GET'])
def get_dishes(request):
    # Get the logged-in user
    try:
        user = request.user

        # Fetch the restaurant owner associated with the logged-in user
        restaurant_owner = RestaurantOwner.objects.get(user=user)

        # Fetch dishes associated with this restaurant owner using restaurant_id or restaurant_name
        dishes = Dish.objects.filter(restaurant_id=restaurant_owner.restaurant_id)  # or use restaurant_name

        # Serialize the dishes
        dishes_data = [
            {
                'dish_id':dish.id,
                'dish_name': dish.dish_name,
                'price': dish.price,
                'category': dish.category,
                'restaurant_name': restaurant_owner.restaurant_name,
            }
            for dish in dishes
        ]

        return Response(dishes_data)
    except RestaurantOwner.DoesNotExist:
        return Response({'error': 'Restaurant owner not found'}, status=404)

    
    # dishes = Dish.objects.all()  # Fetch all dishes
    # serializer = DishSerializer(dishes, many=True)
    # return Response(serializer.data)

# @api_view(['PUT'])
# def update_dish(request, pk):
#     try:
#         dish = Dish.objects.get(pk=pk)
#     except Dish.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     serializer = DishSerializer(dish, data=request.data)
    
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['PUT'])
# def edit_dish(request, dish_id):
#     try:
#         # Find the dish based on the dish_name
#         dish = Dish.objects.get(id=dish_id)
#         # dish = Dish.objects.get(dish_name=dish_name)
#         data = request.data
#         dish.dish_name = data.get('dish_name', dish.dish_name)
#         dish.price = data.get('price', dish.price)
#         dish.category = data.get('category', dish.category)
#         dish.save()
#         return Response({'success': 'Dish updated successfully'})
#     except Dish.DoesNotExist:
#         return Response({'error': 'Dish not found'}, status=404)
#     except Exception as e:
#         return Response({'error': str(e)}, status=400)





@api_view(['PUT'])
def edit_dish(request, dish_id):
    try:
        # Get the current logged-in user (restaurant owner)
        restaurant_owner = RestaurantOwner.objects.get(user=request.user)

        # Get the dish that belongs to this restaurant owner with the matching dish_id
        dish = Dish.objects.get(id=dish_id, restaurant=restaurant_owner.restaurant_name)
    except Dish.DoesNotExist:
        return Response({'error': 'Dish not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        # Update the dish with new data
        serializer = DishSerializer(dish, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Login view
# def login_user(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)
#             return redirect('dashboard')  # Redirect to the dashboard after login
#         else:
#             return render(request, 'accounts/login.html', {'error': 'Invalid credentials'})

#     return render(request, 'accounts/login.html')

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




# @api_view(['GET'])
# def yelp_search(request):
#     location = request.query_params.get('location', 'San Francisco')
#     headers = {
#         'Authorization': 'Bearer YOUR_YELP_API_KEY',
#     }
#     params = {
#         'location': location,
#         'limit': 10,
#     }
#     response = requests.get('https://api.yelp.com/v3/businesses/search', headers=headers, params=params)
#     return Response(response.json())



# views.py
# from django.http import JsonResponse
from .models import RestaurantOwner
import logging

logger = logging.getLogger(__name__)

def search_restaurants(request):
    try:
        restaurants = RestaurantOwner.objects.all().values('restaurant_name', 'profile_picture', 'address','created_at')
        logger.info(f"Fetched {len(restaurants)} restaurants")
        return JsonResponse(list(restaurants), safe=False)
    except Exception as e:
        logger.error(f"Error fetching restaurants: {e}")
        return JsonResponse({'error': str(e)}, status=500)





##got restaurants from API

# YELP_API_KEY = 'hgb0K92RUziF7C0BeOdy1WHRp_TJQmtcNkDNGjJ6M8Nqig6ZL-3nnxtlvf23g6_TPE49tGqUFzQYUGS2LVOZDOZQp4RT83wiKWedfQEPBtYRmxm_cq75DbVsRln_ZnYx'  # Use your actual API key

# @api_view(['GET'])
# def search_restaurants(request):
#     location = request.GET.get('location')
    
#     if not location:
#         return Response({'error': 'Location parameter is required'}, status=400)

#     headers = {
#         'Authorization': f'Bearer {YELP_API_KEY}',
#     }

#     url = f'https://api.yelp.com/v3/businesses/search?location={location}'
#     response = requests.get(url, headers=headers)

#     if response.status_code == 200:
#         return Response(response.json())
#     else:
#         return Response(response.json(), status=response.status_code)




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import RestaurantOwner

@csrf_exempt
def update_restaurant_profile(request):
    if request.method == 'POST':
        user = request.user
        restaurant_owner = RestaurantOwner.objects.get(user=user)

        restaurant_owner.restaurant_name = request.POST.get('restaurant_name')
        restaurant_owner.location = request.POST.get('location')
        restaurant_owner.description = request.POST.get('description')
        restaurant_owner.contact_info = request.POST.get('contact_info')
        restaurant_owner.timings = request.POST.get('timings')

        if 'profile_picture' in request.FILES:
            restaurant_owner.profile_picture = request.FILES['profile_picture']

        restaurant_owner.save()
        return JsonResponse({'message': 'Profile updated successfully!'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
