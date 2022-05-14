""" Define url patterns for music_controller app """
from .views import *
from django.urls import path


# Define Django patterns of urls after api/
urlpatterns = [
    # Example of how to use function view - as seen in api.views
    # path('', main),
    path('rooms', RoomView.as_view()),
    path('create', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoomSettings.as_view())
]
