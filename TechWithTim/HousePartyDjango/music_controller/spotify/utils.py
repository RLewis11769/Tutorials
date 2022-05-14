""" Helper functions used by spotify.views """
from .credentials import CLIENT_ID, CLIENT_SECRET
from .models import SpotifyTokens
from datetime import timedelta
from django.utils import timezone
from requests import get, post, put


BASE_URL = 'https://api.spotify.com/v1/me/'


def get_user_tokens(session_id):
    """ Check if user has tokens in db and return if they do """
    user_tokens = SpotifyTokens.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_create_user_tokens(session_id, access_token,
                              token_type, expires_in, refresh_token):
    """
    If user has tokens in db, update them
    If user does not have tokens in db, create them
    Save tokens to db
    """
    tokens = get_user_tokens(session_id)
    # Change expires_in to datetime when expires (3600 seconds in the future)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    if tokens:
        # Update tokens in db and save
        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in
        tokens.refresh_token = refresh_token
        tokens.save(update_fields=['access_token', 'token_type',
                                   'expires_in', 'refresh_token'])
    else:
        # Create new token instance in db and save
        tokens = SpotifyTokens(user=session_id, access_token=access_token,
                               token_type=token_type, expires_in=expires_in,
                               refresh_token=refresh_token)
        tokens.save()


def is_authenticated(session_id):
    """ Check if user has tokens in db - update refresh token if expired """
    tokens = get_user_tokens(session_id)
    if tokens:
        # Check if access token is expired and get refresh token if yes
        expiry_date = tokens.expires_in
        if expiry_date <= timezone.now():
            get_new_refresh_token(session_id)
        return True
    return False


def get_new_refresh_token(session_id):
    """
    Send post request to spotify endpoint given to get new refresh token
    Update database with new access data (refresh token stays the same)
    """
    refresh_token = get_user_tokens(session_id).refresh_token
    # Send post request and return response as json
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    # Retrieve data from response values at keys
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    # Update tokens
    update_create_user_tokens(session_id, access_token,
                              token_type, expires_in, refresh_token)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    """
    Function to execute put/post/get requests to spotify api
    Default info so can be used for all requests
    Returns data from get requests (post and put don't return data)
    """
    # Get user tokens
    tokens = get_user_tokens(session_id)
    # Send post request and return response as json
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokens.access_token
    }
    # Post request
    if post_:
        post(BASE_URL + endpoint, headers=headers)
    # Put request
    elif put_:
        put(BASE_URL + endpoint, headers=headers)
    # Get request - need to pass something with it, which is why {}
    else:
        response = get(BASE_URL + endpoint, {}, headers=headers)
        # Get has potential for error, so make sure get response
        try:
            return response.json()
        except Exception as e:
            return {'Error': e}


def play_song(session_id):
    """ Send put request to spotify endpoint given to play song """
    return execute_spotify_api_request(session_id, 'player/play', put_=True)


def pause_song(session_id):
    """ Send put request to spotify endpoint given to pause song """
    return execute_spotify_api_request(session_id, 'player/pause', put_=True)


def skip_song(session_id):
    """ Send post request to spotify endpoint given to skip song """
    return execute_spotify_api_request(session_id, 'player/next', post_=True)
