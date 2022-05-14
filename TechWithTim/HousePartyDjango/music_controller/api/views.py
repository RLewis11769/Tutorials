""" Django REST Framework views for handling backend API requests """
from .models import Room
from .serializers import *
from django.http.response import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView


# A possible way to render a page
# from django.http import HttpResponse
# def main(request):
#     """ Render main page (as seen in urls.py) """
#     return HttpResponse("Hello, world!")


class RoomView(generics.ListAPIView):
    """
    Pre-created view to view all different rooms
    At /api/rooms endpoint - shows list view of all rooms in json
    """
    # Uses all Room objects in database
    queryset = Room.objects.all()
    # Uses RoomSerializer to serialize Room objects to JSON
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    """
    Send request to backend to create new room
    Adds data to Room db
    Returns room data in json format
    """
    serializer_class = CreateRoomSerializer

    # Override default behavior of POST request
    def post(self, request, format=None):
        """ Create a new room """
        # If don't have session, create one, otherwise use it
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # Serialize data to put into format can use
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # If valid data, get data from serializer and session key
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            # Check if host already has room
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                # If so, update values (no need to create new room)
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                # Otherwise, create new room
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
        # Save room code to session in case disconnected
        self.request.session['room_code'] = room.code
        # Return serialized data and status code
        return Response(RoomSerializer(room).data,
                        status=status.HTTP_201_CREATED)


class GetRoom(APIView):
    """
    View to get information about specific room
    Returns data about given room in json format
    """
    # Define serializer to use
    serializer_class = RoomSerializer
    # Get value from url after ?code= (this will be room code)
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        """ Sends get request to backend to get room information """
        # Look for any parameters from GET in url that match name code
        code = request.GET.get(self.lookup_url_kwarg)
        if code:
            # If found, find room with code
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                # If found, serialize room and return data
                data = RoomSerializer(room[0]).data
                # Add is_host key if current user has session key
                data['is_host'] = (self.request.session.session_key
                                   == room[0].host)
                return Response(data, status=status.HTTP_200_OK)
            # If room doesn't exist, return error
            return Response({'Room Not Found': 'Invalid room code'},
                            status=status.HTTP_404_NOT_FOUND)
        # If not given code, return error
        return Response({'Bad Request': 'Code parameter not found in request'},
                        status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    """
    View to allow user to join room
    Returns message about whether request was successful or not
    """
    # Get value from url after ?code= (this will be room code)
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        """ Sends post request to backend to join room as host or guest """
        # If don't have session, create one, otherwise use it
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # Get code from request
        code = request.data.get(self.lookup_url_kwarg)
        if code:
            # Retrieve room object
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                # If found, update host and session key
                room = room_result[0]
                # Let session know that user is in this room
                # So can add back later if disconnected or redirected
                self.request.session['room_code'] = room
                return Response({'message': 'Room Joined'},
                                status=status.HTTP_200_OK)
            # If entered wrong room code
            return Response({'Room Not Found': 'Invalid Room Code'},
                            status=status.HTTP_404_NOT_FOUND)
        # If messed up request entirely and didn't give code
        return Response({'Bad Request': 'Code parameter not found.'},
                        status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):
    """
    Determines room user has created/joined
    Returns room code in format code=<room code> (in json format)
    """

    def get(self, request, format=None):
        """ Sends get request to backend to find out which room user is in """
        # If don't have session, create one, otherwise use it
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # Retrieve room code from session
        data = {
            'code': self.request.session.get('room_code'),
        }
        # Return json response (rather than object as usual) with room code
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    """
    View to allow user to leave room
    Without this, user is continuously redirected to room they were in
    Want to allow user to return to homepage if left room
    If host leaves, room is deleted
    Returns message about whether request was successful or not
    """

    def post(self, request, format=None):
        """ Sends post request to backend to leave room """
        if 'room_code' in self.request.session:
            # If room code in session, delete it
            self.request.session.pop('room_code')
            # Check if host is leaving - if so, delete room
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            if len(room_results) > 0:
                # If host has room, delete it
                room_results[0].delete()
        return Response({'message': 'Success'}, status=status.HTTP_200_OK)


class UpdateRoomSettings(APIView):
    """
    View to allow host to update room settings
    Meaning can update guest_can_pause and votes_to_skip fields
    Returns message about whether request was successful or not
    """
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        """ Send patch request to backend to update room settings in db """
        # If don't have session, create one, otherwise use it
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # Serialize data into JSON format
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Save values from serializer to variables
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')
            # Find room with code
            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'message': 'Room not found'},
                                status=status.HTTP_404_NOT_FOUND)
            room = queryset[0]
            # Get current user's session key to compare against host's
            user_id = self.request.session.session_key
            # Only host can update settings
            if room.host != user_id:
                return Response({'message': 'User not host'},
                                status=status.HTTP_403_FORBIDDEN)
            # Update room fields
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            # Save room
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            # Return updated room data
            return Response(RoomSerializer(room).data,
                            status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid Data'},
                        status=status.HTTP_400_BAD_REQUEST)
