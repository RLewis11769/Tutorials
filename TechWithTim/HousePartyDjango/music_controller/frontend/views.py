""" View defined in api.urls that renders frontend based on request """
from django.shortcuts import render


def index(request, *args, **kwargs):
    """ Renders HTML of homepage """
    return render(request, 'index.html')
