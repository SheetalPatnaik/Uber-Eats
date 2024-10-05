from django.urls import path
from .views import signup, login_user, dashboard, logout_user, profile_view, search_restaurants
from .views import search_restaurants
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_user, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('api/yelp/search/', search_restaurants, name='yelp_search'),
    path('api/yelp/search/', search_restaurants, name='search_restaurants'),
]