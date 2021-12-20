""" File holding routes for basic pages, not /user, /post, etc. """
from flask import Blueprint, render_template, request
from app_package.models import Post

main = Blueprint('main', __name__)


# Any of given routes will access home page
@main.route("/")
@main.route("/home")
@main.route("/index")
def home():
    """ Renders home page including pagination if more than 5 posts """
    # Get page number from url - default to 1 - must be int
    page = request.args.get('page', 1, type=int)
    # Get posts from db, order by date_posted, and paginate by 5
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(per_page=5)
    # Render home page with all posts in database
    return render_template("home.html", posts=posts)


@main.route("/about")
def about():
    """ Renders about page """
    return render_template("about.html", title="About")
