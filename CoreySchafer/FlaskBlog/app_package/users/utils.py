""" File holding helper functions for routes in users package """
from app_package import mail
from flask import current_app, url_for
from flask_mail import Message
from os import path
from PIL import Image
from secrets import token_hex


def save_picture(form_picture):
    """
    Helper function for "account" route
    Saves sized picture to profile_pics folder
    Returns encoded filename found in profile_pics folder for db

    Args:
        form_picture: .jpg or .png file uploaded by user in UpdateAccountForm
    """
    random_hex = token_hex(8)
    # Not keeping original file name (encoding as random hex)
    # First variable from splitext is file name (don't need)
    # So ignoring unused variable with _ for no unused variable warning
    _, file_ext = path.splitext(form_picture.filename)
    pic_filename = random_hex + file_ext
    # Join path, profile_pics folder, and filename to find full path
    pic_path = path.join(current_app.root_path,
                         'static/profile_pics', pic_filename)
    # No matter size of image, resize to max 125x125 (as tuple)
    resized = Image.open(form_picture)
    resized.thumbnail((125, 125))
    # Save resized picture to profile_pics folder
    resized.save(pic_path)
    return (pic_filename)


def send_reset_email(user):
    """
    Helper function for "reset_password" route
    Sends email with reset link to user

    Args:
        user: User object from db to send msg to
    """
    # Generate reset token
    token = user.get_reset_token()
    # Message to send - subject, sender, recipients
    msg = Message('Password Reset Request',
                  sender="noreply@demo.com",
                  recipients=[user.email])
    # Define Message body separately - with full domain rather than relative
    # Weird spacing issues because fstring will send EXACTLY this string
    msg.body = f'''To reset your password, visit the following link:
{url_for('users.reset_password', token=token, _external=True)}

If you did not make this request, ignore this email. No changes will be made.
'''
    # Send email
    mail.send(msg)
