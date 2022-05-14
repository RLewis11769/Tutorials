""" """
from .views import index
from django.urls import path


# Tell Django this file is in frontend folder
# Neccessary so Django knows where to look when redirected to frontend:
app_name = 'frontend'

# All of these are defined in HomePage
urlpatterns = [
    # Any request to / will be handled by index function in views.py
    # As seen in music_controller/frontend/urls.py
    # Note: in spotify.views.py, redirecting to frontend: with empty string
    path('', index, name=""),
    path('join', index),
    path('create', index),
    # Set up dynamic URL that takes any string as a parameter
    path('room/<str:roomCode>', index),
    path('info', index),
]
