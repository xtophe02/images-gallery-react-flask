from flask import Flask, request
from dotenv import load_dotenv
from requests import get
import os
from flask_cors import CORS

load_dotenv()

UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_API_KEY = os.getenv('UNSPLASH_API_KEY')

if not UNSPLASH_API_KEY:
    raise EnvironmentError(
        "UNSPLASH_API_KEY is not set. please set it in .env file.")

app = Flask(__name__)
CORS(app)
# Check the FLASK_ENV environment variable
if os.environ.get('FLASK_ENV') == 'production':
    # Production configuration
    app.debug = False
    # Set the production WSGI server (e.g., gunicorn)
    # You may need to install gunicorn using pip install gunicorn
    # from gunicorn import Gunicorn
    # app.wsgi_app = Gunicorn(app.wsgi_app)
else:
    # Development configuration
    app.debug = True


@app.route('/new-image')
def new_image():
    query = request.args.get('query')
    if not query:
        return {"error": "query is required"}, 400
    headers = {"Authorization": f"Client-ID {UNSPLASH_API_KEY}"}
    reponse = get(UNSPLASH_URL, headers=headers, params={"query": query})
    data = reponse.json()
    return data


if __name__ == '__main__':
    app.run()
