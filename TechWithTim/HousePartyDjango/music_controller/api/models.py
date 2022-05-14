""" Define table models for spotify API """
from django.db import models
import string
import random


def generate_unique_code():
    """ Generate unique code as Room's invitation code """
    length = 6
    while True:
        # Create random string of uppercase letters of 6 characters
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        # Make sure code is unique for all existing Rooms
        if Room.objects.filter(code=code).count() == 0:
            return code


class Room(models.Model):
    """ Define fields for Room - fat models, thin views """
    code = models.CharField(max_length=8,
                            default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    # Continually update song playing
    current_song = models.CharField(max_length=50, null=True)
