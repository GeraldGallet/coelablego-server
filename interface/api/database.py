from pymongo import MongoClient
from flask_jsonpify import jsonify

class DatabaseInterface:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client.lego_database
