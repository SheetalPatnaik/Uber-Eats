"""
URL configuration for ubereats_clone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import search_restaurants,add_menu_item,get_menu_for_cust,place_order,RestaurantOrdersView,OrderUpdateView,customer_orders,restaurant_owner_profile_view
urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('api/restaurants/', search_restaurants, name='search_restaurants'),
    path('api/updatemenu/', add_menu_item, name='add_menu_item'),
    # path('api/', search_restaurants, name='search_restaurants'),  # Add this line
    path('api/menu/<str:username>/', get_menu_for_cust, name='get_menu_for_cust'),
    path('api/place-order/', place_order, name='place-order'),
    path('api/restaurant-orders/', RestaurantOrdersView.as_view(), name='restaurant_orders'),
    path('api/restaurant-orders/<str:order_id>/', OrderUpdateView.as_view(), name='order-update'),
    # path('api/orders/<str:username>/', CustomerOrdersView.as_view(), name='customer-orders'),
    path('api/customer-orders/', customer_orders, name='customer_orders'),
    path('restaurant_owner/profile/', restaurant_owner_profile_view, name='restaurant_owner_profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)