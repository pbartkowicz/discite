"""discite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from discite_app import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Auth
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    # Test API
    path('api/test/<str:test_id>', views.show_test, name='show test data'),
    path('api/test', views.create_test, name='create test'),
    path('api/test/<str:test_id>/submit', views.submit_test, name='submit test'),
    path('api/test/<str:test_id>/public', views.change_test_public, name='change test public state'),

    # User API
    path('api/user/register', views.register_user, name='register a new user'),
    path('api/user/info', views.get_user_info, name='get user info'),
    path('api/user/nick', views.change_user_nick, name='change user nick'),
    path('api/user/password', views.change_user_password, name='change user password'),
    path('api/user/profile', views.get_user_profile, name='get user profile details')
]
