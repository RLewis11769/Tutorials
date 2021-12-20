""" File that imports and runs the application (based on init file) """
# Import function from init
from app_package import create_app

# Run function - don't need to specify config class because default is Config
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
