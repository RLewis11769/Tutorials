""" Define URL patterns for spotify/ endpoints """
from django.urls import path
from .views import *


urlpatterns = [
    path('get-url', AuthURL.as_view()),
    # Redirect to page from this view
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('play', PlaySong.as_view()),
    path('pause', PauseSong.as_view()),
    path('skip', SkipSong.as_view()),
]
