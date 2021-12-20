""" Create tables in database and set up Flask-Login """
from app_package import db, login_manager
from datetime import datetime
from flask import current_app
from flask_login import UserMixin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


# Finds current user based on id
@login_manager.user_loader
def load_user(user_id):
    """ Returns found user when given user_id """
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    """ Create User table in database """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False,
                         unique=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    profile_pic = db.Column(db.String(20), nullable=False,
                            default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    # Create one-to-many relationship with Post class
    # Not actual column in database, just relationship - no "author" anywhere
    posts = db.relationship('Post', backref='author', lazy=True)

    def get_reset_token(self, expires_sec=1800):
        """ Create and return token for password reset """
        # Create serializer object - default is 30 minutes
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        # Serialize user's id and return token
        return s.dumps({'user_id': self.id}).decode('utf-8')

    # Doesn't expect self parameter as arg, just token
    @staticmethod
    def verify_reset_token(token):
        """
        Verify token for password reset and return user

        Args:
            token: token to verify
        """
        # Create serializer object (requires secret key)
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            # Decode token and get user id
            user_id = s.loads(token)['user_id']
        except Exception:
            # If token is invalid/has expired, do nothing
            return (None)
        # Returns user object associated with user_id
        return User.query.get(user_id)

    def __repr__(self):
        """
        Returns printable representation of User object
        Meaning that when print User.query, this prints
        """
        return f"User('{self.username}', '{self.email}', '{self.profile_pic}')"


class Post(db.Model):
    """ Create Post table in database """
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False,
                            default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    # Create one-to-many relationship with User class
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        nullable=False)

    def __repr__(self):
        """ Returns printable representation of Post object """
        return f"Post('{self.title}', '{self.date_posted}')"
