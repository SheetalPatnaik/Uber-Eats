from django.urls import path
from .views import signup, login_user, dashboard, logout_user, profile_view, search_restaurants, rest_login, get_dishes,edit_dish,update_restaurant_profile
from .views import search_restaurants
from . import views
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_user, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('api/update_restaurant_profile/', update_restaurant_profile, name='update_restaurant_profile'),

    # path('api/yelp/search/', search_restaurants, name='yelp_search'),
    path('api/rest/login/', rest_login, name='rest_login'),
    # path('api/yelp/search/', search_restaurants, name='search_restaurants'),
    path('restaurants/', search_restaurants, name='search_restaurants'),
    path('get_dishes/', get_dishes, name='get_dishes'),
    path('rest_login/', views.rest_login, name='rest_login'),
    path('add_dish/', views.add_dish, name='add_dish'),
    # path('api/update_dish/<int:pk>/', update_dish, name='update_dish'),
    #  path('api/edit_dish/<str:dish_name>/', edit_dish, name='edit_dish'),
    path('api/edit_dish/<int:dish_id>/', edit_dish, name='edit_dish'),

     

]


