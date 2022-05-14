""" Models for db instances to store data used by spotify api """
from api.models import Room
from django.db import models


class SpotifyTokens(models.Model):
    """ Set fields for SpotifyTokens model db """
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)


class Vote(models.Model):
    """ Set fields to hold number of votes for each song in db """
    user = models.CharField(max_length=50, unique=True)
    song_id = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    # Define room code as foreign key
    # When Room is deleted, delete all votes associated with it
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
