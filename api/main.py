from flask import Flask, request, jsonify
from dotenv import load_dotenv
from requests import get
import os
from flask_cors import CORS
from mongo_client import mongo_client


gallery = mongo_client.gallery
images_collection = gallery.images


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


@app.route('/images/<id>', methods=['DELETE'])
def delete_image(id):
    if not id:
        return {"error": "id is required"}, 400
    images_collection.delete_one({"_id": id})
    return {"status": "success delete"}


@app.route('/images', methods=['GET', 'POST', 'OPTIONS', 'DELETE'])
def images():
    if request.method == 'OPTIONS':
        # Preflight request. Respond successfully:
        return jsonify({}), 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
        }
    if request.method == 'GET':
        images = images_collection.find()

        return list(images)
    elif request.method == 'POST':

        image = request.json
        if not image:
            return {"error": "image is required"}, 400
        image["_id"] = image["id"]

        return jsonify(images_collection.insert_one(image).inserted_id)
    else:
        return {"error": "method not allowed"}, 405


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
