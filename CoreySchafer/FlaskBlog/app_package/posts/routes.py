""" File holding routes for /post URLs """
from app_package import db
from app_package.models import Post
from app_package.posts.forms import PostForm
from flask import (abort, Blueprint, flash,
                   redirect, render_template, request, url_for)
from flask_login import current_user, login_required

posts = Blueprint('posts', __name__)


@posts.route("/post/new", methods=['GET', 'POST'])
@login_required
def new_post():
    """ Render page to create new post """
    form = PostForm()
    if form.validate_on_submit():
        # If necessary fields entered properly in form, save to db
        post = Post(title=form.title.data,
                    content=form.content.data,
                    author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created!', 'success')
        return redirect(url_for('main.home'))
    # Display form with any current data
    # To begin new post or if need to correctly fill out form after error
    return render_template("create_modify_post.html",
                           title="New Post",
                           form=form, legend="New Post")


@posts.route("/post/<int:post_id>")
def display_post(post_id):
    """ Render template to display specific post """
    post = Post.query.get_or_404(post_id)
    # Can edit or delete post using update_post and delete_post routes
    return render_template("view_post.html", title=post.title, post=post)


@posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    """ Render template for post's author to modify/update post """
    post = Post.query.get_or_404(post_id)
    # Limits updating/editing to post's author (or forbidden error)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        # Save modified data to database - POST method
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('posts.display_post', post_id=post.id))
    elif request.method == 'GET':
        # Display current data from db in form - GET method
        form.title.data = post.title
        form.content.data = post.content
    return render_template("create_modify_post.html", title="Update Post",
                           form=form, legend="Update Post")


@posts.route("/post/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    """ Renders template page for author to delete post from database """
    post = Post.query.get_or_404(post_id)
    # Limits post deletion to post's author (or forbidden error)
    if post.author != current_user:
        abort(403)
    # If post's author, delete post and save changes in db
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('main.home'))
