"""novus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path
from rest_framework.routers import SimpleRouter

from catalog.views import GoodView, CategoryView, CartView, RegistrationView, AuthorizationView

router = SimpleRouter()
router.register('api/goods', GoodView,  basename='goods')
router.register('api/category', CategoryView, basename='category')
router.register('api/cart', CartView, basename='cart')
router.register('api/register', RegistrationView, basename='registration')
router.register('api/authorize', AuthorizationView, basename='authorization')

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls
