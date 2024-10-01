from django.urls import path
from .views import signup, login_user, dashboard, logout_user

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_user, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', logout_user, name='logout'),
]