"""
File holding routes specific to user, including /user, /register, /login,
/logout, /account, /reset_password
"""
from app_package import bcrypt, db
from app_package.models import User, Post
from app_package.users.forms import (RegistrationForm, LoginForm,
                                     UpdateAccountForm, RequestResetForm,
                                     ResetPasswordForm)
from app_package.users.utils import save_picture, send_reset_email
from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

users = Blueprint('users', __name__)


@users.route("/register", methods=["GET", "POST"])
def register():
    """ Renders page to register user """
    # If user already logged in, redirect to home page - no need to register
    if current_user.is_authenticated:
        return redirect(url_for("main.home"))
    form = RegistrationForm()
    if form.validate_on_submit():
        # Save hashed password to db, not plain text
        hashed_pw = bcrypt.generate_password_hash(form.password.data)
        # If form fields validated/submission is valid, save info to db
        user = User(username=form.username.data,
                    email=form.email.data, password=hashed_pw)
        db.session.add(user)
        db.session.commit()
        # Alert Flash message with success Bootstrap class
        flash(f"Account created for {form.username.data}!", "success")
        # Redirect to login page after successful registration
        return redirect(url_for("users.login"))
    return render_template("register.html", title="Register", form=form)


@users.route("/login", methods=["GET", "POST"])
def login():
    """ Renders page to log user in """
    # If user already logged in, redirect to home page - no need to log in
    if current_user.is_authenticated:
        return redirect(url_for("main.home"))
    form = LoginForm()
    # If no errors in form submission, redirect to home page with message
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        # If user exists and password matches, log user in
        if user and bcrypt.check_password_hash(user.password,
                                               form.password.data):
            # Login user with login manager plugin
            login_user(user, remember=form.cookie.data)
            # Redirect to next page (optional)
            # Meaning if trying to access page that requires login,
            # login and then redirect to that page
            next_page = request.args.get("next")
            if next_page:
                return redirect(next_page)
            else:
                # If not trying to access secondary page, just redirect to home
                # Creates flash message to be passed to template on home page
                flash('You have logged in', 'success')
                return redirect(url_for('main.home'))
        else:
            # If user not found or password incorrect, Flash message with error
            flash('Incorrect username or password', 'danger')
    return render_template("login.html", title="Login", form=form)


@users.route("/logout")
def logout():
    """ Render page to log user out """
    # Use Login Manager plugin to log user out, then redirect to home page
    logout_user()
    return redirect(url_for("main.home"))


@users.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    """ Render page to view/update user pic, email, or password """
    form = UpdateAccountForm()
    if form.validate_on_submit():
        # Save modified data to database
        if form.picture.data:
            # If picture is not 'default.jpg', save to system
            picture_file = save_picture(form.picture.data)
            current_user.profile_pic = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('users.account'))
    elif request.method == 'GET':
        # Display current data from db in form
        form.username.data = current_user.username
        form.email.data = current_user.email
    # Get profile picture from db and display in template
    profile_pic = url_for("static",
                          filename=f"profile_pics/{current_user.profile_pic}")
    return render_template("account.html", title="Account",
                           profile_pic=profile_pic, form=form)


@users.route("/user/<string:username>")
def posts_by_user(username):
    """ Render template to display posts from specific user """
    # Get page number from url - default to 1 - must be int
    page = request.args.get('page', 1, type=int)
    # Find user info from db based on username
    user = User.query.filter_by(username=username).first_or_404()
    # Get all posts from user, order, and paginate
    posts = Post.query.filter_by(author=user)\
        .order_by(Post.date_posted.desc())\
        .paginate(page=page, per_page=5)
    # Get profile picture from db and display in template
    profile_pic = url_for("static",
                          filename=f"profile_pics/{user.profile_pic}")
    return render_template("user_posts.html", posts=posts,
                           user=user, profile_pic=profile_pic)


@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    """ Render template to request password reset """
    # Make sure user is not logged in
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        # Find user in db based on email
        user = User.query.filter_by(email=form.email.data).first()
        # If user exists, send email with reset link
        if user:
            send_reset_email(user)
        flash('An email has been sent to reset your password.', 'info')
        return redirect(url_for('users.login'))
    return render_template("reset_request.html",
                           title="Reset Password", form=form)


@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_password(token):
    """ Render template to reset password """
    # Make sure user is not logged in
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    # Find user in db based on token
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    # If user exists and has valid token, display form to reset password
    form = ResetPasswordForm()
    if form.validate_on_submit():
        # If user exists, hash password and save changes in db
        hashed_pw = bcrypt.generate_password_hash(form.password.data)
        user.password = hashed_pw
        db.session.commit()
        flash('Your password has been updated!', 'success')
        return redirect(url_for('users.login'))
    return render_template("reset_token.html",
                           title="Reset Password", form=form)
