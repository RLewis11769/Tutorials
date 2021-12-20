""" File holding Config class for Flask app with default settings """
# from os import environ
from secrets import token_hex
import json

# Use config.json to set database, email, and password
# Otherwise, uncomment lines using environ.get and set environment variables
with open('config.json', 'r') as config_file:
    # Create dictionary from json file
    config = json.load(config_file)


class Config:
    """ Class to hold config settings for Flask app """
    # Random string used to encrypt cookies and save to browser
    # Secret key required to keep client-side sessions secure
    secret_key = token_hex(16)
    SECRET_KEY = secret_key

    # Set database URI in relative path
    # Do it like this because easy to switch to postgresql/other db later
    # SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URI')
    SQLALCHEMY_DATABASE_URI = config.get('DATABASE_URI')

    # Settings required for Mail object with gmail
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    # MAIL_USERNAME = environ.get('EMAIL_USER')
    MAIL_USERNAME = config.get('EMAIL_USER')
    # MAIL_PASSWORD = environ.get('EMAIL_PW')
    MAIL_PASSWORD = config.get('EMAIL_PW')
