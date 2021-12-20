# from app_package.models import User, Post
from app_package.config import Config
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy


# Create database object
db = SQLAlchemy()

# Create Bcrypt object
bcrypt = Bcrypt()

# Create LoginManager object
login_manager = LoginManager()
# Set login view as function name of route
# If page requires login, user will be redirected to login page
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'

# Create Mail object that uses gmail as default email provider
mail = Mail()


def create_app(config_class=Config):
    """ Create app with default configuration """
    app = Flask(__name__)

    # Set configuration settings based on Config class in config.py
    app.config.from_object(Config)

    # Initialize applications/objects with app
    # Without function, would be: db = SQLAlchemy(app) for example
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    # Import blueprint routes
    from app_package.users.routes import users
    from app_package.posts.routes import posts
    from app_package.main.routes import main
    from app_package.errors.handlers import errors

    # Register instances of blueprints
    # Note: With blueprint, all imports in files are from this file's path)
    app.register_blueprint(users)
    app.register_blueprint(posts)
    app.register_blueprint(main)
    app.register_blueprint(errors)

    return (app)
