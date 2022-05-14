"""music_controller URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path, include

# This is first part of url. Second part is in url files in other apps
urlpatterns = [
    path('admin/', admin.site.urls),
    # Anything that starts with api/ will be handled by api/urls.py
    path('api/', include('api.urls')),
    # Anything that starts with spotify/ will be handled by spotify/urls.py
    path('spotify/', include('spotify.urls')),
    # If endpoint doesn't match admin, api, or spotify, send to frontend.urls
    # These will be forward-facing for user - others are all internal
    path('', include('frontend.urls'))
]
