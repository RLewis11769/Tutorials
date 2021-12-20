""" File holding any forms needed for routes specific to user """
from app_package.models import User
from flask_login import current_user
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import BooleanField, PasswordField, StringField, SubmitField
from wtforms.validators import (DataRequired, Length, Email, EqualTo,
                                ValidationError)


class RegistrationForm(FlaskForm):
    """ Class to create form for user registration """
    username = StringField('Username',
                           validators=[DataRequired(),
                                       Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             validators=[DataRequired()])
    confirm_pw = PasswordField('Confirm Password',
                               validators=[DataRequired(),
                                           EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username):
        """
        If change username, verify unique by querying database for user
        Raise error if user exists - else do nothing
        If don't change username, do nothing (querying would find current user)
        """
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('Username already exists. \
                                   Please choose a different username.')

    def validate_email(self, email):
        """
        if change, email, verify unique email by querying database for user
        Raise error if user exists - else do nothing
        If don't change username, do nothing (querying would find current user)
        """
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Email already exists. \
                                   Are you already registered?')


class LoginForm(FlaskForm):
    """ Class to create form for user login """
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             validators=[DataRequired()])
    cookie = BooleanField('Remember Me')
    submit = SubmitField('Login')


class UpdateAccountForm(FlaskForm):
    """
    Class to create form for updating/modifying user account
    Change username, email, or password
    """
    username = StringField('Username',
                           validators=[DataRequired(),
                                       Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    picture = FileField('Update Profile Picture',
                        validators=[FileAllowed(['jpg', '.png'])])
    submit = SubmitField('Update')

    def validate_username(self, username):
        """
        Verify unique username by querying database for user
        Raise error if user exists - else do nothing
        """
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError('Username already exists. \
                    Please choose a different username.')

    def validate_email(self, email):
        """
        Verify unique email by querying database for user
        Raise error if user exists - else do nothing
        """
        if email.data != current_user.email:
            user = User.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError('Email already exists. \
                    Are you already registered?')


class RequestResetForm(FlaskForm):
    """
    Class to create form for requesting token to reset password
    """
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    submit = SubmitField('Request Password Reset')

    def validate_email(self, email):
        """
        Verify that email exists in database
        If doesn't exist, haven't forgotten password - just haven't registered
        """
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('There is no account with that email. \
                You must register first.')


class ResetPasswordForm(FlaskForm):
    """
    Class to create form for resetting password
    """
    password = PasswordField('Password',
                             validators=[DataRequired()])
    confirm_pw = PasswordField('Confirm Password',
                               validators=[DataRequired(),
                                           EqualTo('password')])
    submit = SubmitField('Reset Password')
