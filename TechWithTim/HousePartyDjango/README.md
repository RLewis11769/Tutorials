# House Party Django

## Django Installation

1. Install Django with:
```
pip3 install django djangorestframework
```

2. Create Django project with one of:
```
django-admin startproject music_controller
python3 -m django startproject music_controller
```

3. Start Django app with one of:
```
django-admin startapp api
python3 -m django startapp api
python3 ./manage.py startapp api
```

4. Add api to music_controller/music_controller/settings.py INSTALLED_APPS

5. After making changes to model or database:
```
python3 ./manage.py makemigrations
python3 ./manage.py migrate
```

## Dependencies

Installations added upon install with package.json:
```
npm i webpack webpack-cli --save-dev (webpack)
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev (Babel)
npm install @babel/plugin-proposal-class-properties (Babel plugin that allows async/await)
npm i react react-dom --save-dev (React)
npm i react-router-dom (React package to reroute pages)
npm i @material-ui/core (Material UI)
npm i @material-ui/icons (Material UI icons)
npm i @material-ui/lab (Material UI alerts)
```

## Run

In one server, run with:
```
python3 ./manage.py runserver
```
