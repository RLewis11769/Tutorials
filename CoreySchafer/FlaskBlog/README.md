# Flask Blog Website

## Description

Following along with the Flask Tutorial series starting [here](https://www.youtube.com/watch?v=MwZwr5Tvyxo&list=PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH&index=2).

The series was created in April 2018 and primarily uploaded in May 2018 with additions in January 2019. Due to changes in the meantime, some changes have been made to get the application working properly. In addition, this series is probably somewhat outdated according to 2021/2022 standards. However, I wanted to gain some experience/exposure to how the real world might apply deployment of a web page.

I finished the series through Part 12 as described in the tutorial videos. I did not deploy my application with [Linode](https://linode.com/coreyschafer) or set up a domain name or SSL certificate as seen in the videos starting [here](https://www.youtube.com/watch?v=goToXTC96Co&list=PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH&index=13). I did follow along to a certain extent on my Holberton server with [Nginx](https://www.nginx.com/resources/wiki/?_bt=541137080527&_bk=&_bm=&_bn=g&_bg=125748574545&gclid=Cj0KCQiAzfuNBhCGARIsAD1nu-8ffJJYxHOi_4MIMaGzLmq_JRcJquNH08aCANjVgx2Psl5t4mL6nsQaApxREALw_wcB), [Gunicorn](https://docs.gunicorn.org/en/stable/deploy.html), and [certbot](https://certbot.eff.org/).

Because the website has not been hosted, all code can be run on the production server as seen below.

As it is, nothing has been added to the blog site. The home page is empty. However, a user can register, log in, and create posts that will be displayed on the page. Users and created blog posts will be stored in the database and will be available as long as the database exists.

## Production Server

Run with:

```
python3 run.py
```

App will be located at:
- localhost:5000

## Setup

Install requirements with:

```
pip3 install -r requirements.txt
```

Modify email address and password in app_package/config.json!!!

OR

Edit config.py to use environ and enter in the command line:

```
export DATABASE_URI=sqlite:///site.db
export EMAIL_USER="<email_address>"
export EMAIL_PW="<email_password>"
```

The near-empty database, stored in site.db, will be in the app package. It will have one user added to it so that it can be created. This is because the database is not created within the app so needs to exist outside of it. For future reference, create database with:

```
$ python3
from app_package import create_app, db
app = create_app()
app.app_context().push()
db.create_all()
from app_package.models import User, Post
user1 = User(username='Rachel', email='rl@email.com', password='pw')
db.session.add(user1)
db.session.commit()
User.query.all()
```

## Resources

Using:

- Python3 and Flask for building web application
- [Bcrypt](https://www.npmjs.com/package/bcrypt) library for hashing passwords and building password security platform
- [ItsDangerous](https://itsdangerous.palletsprojects.com/en/2.0.x/) for sending and receiving data from unknown environments by enabling serializing and securing signatures (meaning can ensure data has not been tampered with after sending it to client)
- [Jinja](https://jinja.palletsprojects.com/en/3.0.x/) template engine for web page templating through the use of placeholders and variables
- [Flask Blueprints](https://flask.palletsprojects.com/en/2.0.x/blueprints/) for defining collections of reusable instances by organizing project in modules
- [Flask-Login](https://flask-login.readthedocs.io/en/latest/) extension for user session management
- [Flask-Mail](https://pythonhosted.org/Flask-Mail/) extension for sending email to users/clients
- [Pillow](https://pillow.readthedocs.io/en/stable/) library for image processing
- [SQLAlchemy](https://www.sqlalchemy.org/library.html) toolkit for considering a database as a relational mapping engine, not just a collection of tables
- [WTForms](https://wtforms.readthedocs.io/en/3.0.x/) library for flexible form validation and rendering

## Credit

Original project designed by [Corey Schafer](https://github.com/CoreyMSchafer)
