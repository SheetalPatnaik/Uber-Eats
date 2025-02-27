from django.urls import path
from .views import signup, login_user, dashboard, logout_user, profile_view, search_restaurants,rest_login,add_menu_item,get_menu_items,update_menu_item,get_menu_for_cust,place_order,RestaurantOrdersView,OrderUpdateView,customer_orders,restaurant_owner_profile_view
from .views import search_restaurants
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_user, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', logout_user, name='logout'),
    path('profile/', profile_view, name='profile'),
    # path('api/yelp/search/', search_restaurants, name='yelp_search'),
    path('api/rest/login/', rest_login, name='rest_login'),
    path('api/add-menu-item/', add_menu_item, name='add_menu_item'),
    # path('api/yelp/search/', search_restaurants, name='search_restaurants'),
    path('restaurants/', search_restaurants, name='search_restaurants'),
    path('api/menu-items/', get_menu_items, name='get_menu_items'),
    path('api/menu-items/<int:pk>/', update_menu_item, name='update_menu_item'),
    path('api/menu/<str:username>/', get_menu_for_cust, name='get_menu_for_cust'),
    path('api/place-order/', place_order, name='place-order'),
    path('api/restaurant-orders/', RestaurantOrdersView.as_view(), name='restaurant_orders'),
    path('api/restaurant-orders/<str:pk>/', OrderUpdateView.as_view(), name='order-update'),
    # path('api/orders/<str:username>/', CustomerOrdersView.as_view(), name='customer-orders'),
    # path('api/customer-orders/', CustomerOrdersView.as_view(), name='customer-orders'),
    path('api/customer-orders/', customer_orders, name='customer_orders'),
    path('restaurant_owner/profile/', restaurant_owner_profile_view, name='restaurant_owner_profile'),
]