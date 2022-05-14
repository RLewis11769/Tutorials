from .models import Room
from rest_framework import serializers
""" Serializer converts complex data to native Python datatype """
""" Meaning converts model instance to JSON """


class RoomSerializer(serializers.ModelSerializer):
    """ Serializes Room model into JSON format """

    class Meta:
        """ Meta maps db fields to corresponding serializer fields """
        model = Room
        # Note that this is all fields in Room class and id (auto-generated)
        fields = ('id', 'code', 'host', 'guest_can_pause',
                  'votes_to_skip', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    """  Serializes Room model into JSON format when creating room """

    class Meta:
        """  Maps db fields to corresponding serializer fields """
        model = Room
        # Note that these are fields to send to post request
        fields = ('guest_can_pause', 'votes_to_skip')


class UpdateRoomSerializer(serializers.ModelSerializer):
    """  Serializes Room model into JSON format if updating """
    # Not referencing code field in model, redefining bc it's not unique
    code = serializers.CharField(validators=[])

    class Meta:
        """  Maps db fields to corresponding serializer fields """
        model = Room
        # Note that these are fields to send to patch request
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
