from django.shortcuts import render,redirect
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.models import User
from .models import Profile
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

# Signup view
# @csrf_exempt
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate that all fields are provided
    if not username or not email or not password:
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Check for existing username
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists. Try another one!"}, status=status.HTTP_400_BAD_REQUEST)

    # Check for existing email
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered. Please Login!"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the new user
    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)



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


YELP_API_KEY = 'hgb0K92RUziF7C0BeOdy1WHRp_TJQmtcNkDNGjJ6M8Nqig6ZL-3nnxtlvf23g6_TPE49tGqUFzQYUGS2LVOZDOZQp4RT83wiKWedfQEPBtYRmxm_cq75DbVsRln_ZnYx'  # Use your actual API key

@api_view(['GET'])
def search_restaurants(request):
    location = request.GET.get('location')
    
    if not location:
        return Response({'error': 'Location parameter is required'}, status=400)

    headers = {
        'Authorization': f'Bearer {YELP_API_KEY}',
    }

    url = f'https://api.yelp.com/v3/businesses/search?location={location}'
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return Response(response.json())
    else:
        return Response(response.json(), status=response.status_code)