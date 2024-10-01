from django.shortcuts import render,redirect

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.forms import UserCreationForm


# Signup view
def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return render(request, 'accounts/signup.html', {'error': 'Username already exists'})

        # Create the new user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        # Redirect to login page after successful signup
        return redirect('login')

    return render(request, 'accounts/signup.html')


# Login view
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')  # Redirect to the dashboard after login
        else:
            return render(request, 'accounts/login.html', {'error': 'Invalid credentials'})

    return render(request, 'accounts/login.html')


# Dashboard view
def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'accounts/dashboard.html')



# Logout view
def logout_user(request):
    logout(request)  # This will log out the user
    return redirect('login')  # Redirect to login page after logout