""" Django REST Framework views for handling Spotify API requests """
from .credentials import *
from .models import Vote
from .utils import *
from api.models import Room
from django.shortcuts import redirect
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


def spotify_callback(request, format=None):
    """
    Send post request to get access token and save response data to db
    Could be APIView - this is how to do it in function
    Redirect to homepage (which should redirect to room page)
    """
    code = request.GET.get('code')
    # Send post request and return response as json
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    # Retrieve data from response values at keys
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    # Make sure have session key
    if not request.session.exists(request.session.session_key):
        request.session.create()
    # Update or create user tokens in db
    update_create_user_tokens(request.session.session_key,
                              access_token, token_type,
                              expires_in, refresh_token)
    # Redirect back to original frontend after authentication
    return redirect('frontend:')


class AuthURL(APIView):
    """
    Prepare but don't send request to get url
    Return url to redirect to if need to authenticate
    """

    def get(self, request, format=None):
        """ Prepare request to get url """
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            # Define scopes needed for application
            'scope': 'user-read-playback-state \
                      user-modify-playback-state \
                      user-read-currently-playing',
            # Response will come in as code
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
            # Returns url to go to in order to authenticate
        }).prepare().url
        # Return url to redirect to
        return Response({'url': url}, status=status.HTTP_200_OK)


class IsAuthenticated(APIView):
    """ Return t/f whether user is authenticated """

    def get(self, request, format=None):
        """ Get request to check if user is authenticated """
        print("IsAuthenticated")
        authenticated = is_authenticated(self.request.session.session_key)
        return Response({'status': authenticated}, status=status.HTTP_200_OK)


class CurrentSong(APIView):
    """ Find data from current song playing and return to frontend """

    def get(self, request, format=None):
        """ Return object with data about current song playing """
        room_code = self.request.session.get('room_code')
        # No need to check if room exists, just get room
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({'error': 'Room does not exist'},
                            status=status.HTTP_404_NOT_FOUND)
        # Data is based on host's
        host = room.host
        endpoint = "player/currently-playing"
        # Send get request to endpoint
        response = execute_spotify_api_request(host, endpoint)
        # If no song is playing, end
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        # Get song data
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')
        # If multiple artists, create string from list
        artist_string = ""
        for idx, artist in enumerate(item.get('artists')):
            if idx > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name
        # Count number of vote entries in db
        votes = len(Vote.objects.filter(room=room, song_id=song_id))
        # Create custom object with info to send back
        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'song_id': song_id,
            'votes_needed': room.votes_to_skip,
            'votes': votes
        }
        # Update song in Room db
        self.update_room_song(room, song_id)
        return Response(song, status=status.HTTP_200_OK)

    def update_room_song(self, room, song_id):
        """ When new song is playing, update room's song in db """
        # Save current song in variable
        current_song = room.current_song
        # Make sure current song is not the same as new song
        if current_song != song_id:
            # Saving is memory-intensive, so only save if changing
            room.current_song = song_id
            room.save(update_fields=['current_song'])
            # Remove any votes for previous song
            Vote.objects.filter(room=room).delete()


class PlaySong(APIView):
    """ Send request to API to play song """

    def put(self, response, format=None):
        """ Send put request to API (put means insert/update data) """
        # Get information about room
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        # Host always has access, check if room's guests can play/pause
        if (self.request.session.session_key == room.host
           or room.guest_can_pause):
            # Send request to play song - if successful, not returning anything
            play_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response({}, status=status.HTTP_403_FORBIDDEN)


class PauseSong(APIView):
    """ Send request to API to pause song """

    def put(self, response, format=None):
        """ Send put request to API (put means insert/update data)"""
        # Get information about room
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        # Host always has access, check if room's guests can pause
        if (self.request.session.session_key == room.host
           or room.guest_can_pause):
            # Send request to pause song and return success message
            pause_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response({}, status=status.HTTP_403_FORBIDDEN)


class SkipSong(APIView):
    """ Send request to API to skip song """

    def post(self, request, format=None):
        """ Send post request to API (post means create new data) """
        # Get information about room
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        # Get all votes for this room for current song
        votes = Vote.objects.filter(room=room, song_id=room.current_song)
        votes_needed = room.votes_to_skip
        # Host can always decide unilaterally to skip song
        # Guests can skip if previous amount of votes plus this one reaches num
        if (self.request.session.session_key == room.host
           or len(votes) + 1 >= votes_needed):
            # Delete votes for current song and skip it
            votes.delete()
            skip_song(room.host)
        else:
            # If doesn't reach number of votes, add vote to db
            vote = Vote(user=self.request.session.session_key,
                        room=room, song_id=room.current_song)
            vote.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)
