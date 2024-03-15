from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get('MONGO_URL', 'mongo')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)
MONGO_USERNAME = os.environ.get('MONGO_USERNAME', 'root')
MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', '')

mongo_client = MongoClient(host=MONGO_URL, port=int(MONGO_PORT),
                           username=MONGO_USERNAME, password=MONGO_PASSWORD)


def insert_test_document():
    db = mongo_client.test_database
    collection = db.test_collection
    res = collection.insert_one({'name': 'test', 'value': 1})
    print(res)
