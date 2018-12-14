from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request
import pprint

import json
from . import database

class Start(Resource):
    def post(self):
        # Lancer le reset de la machine
        return jsonify({'status': 204})

class SearchPiece(Resource):
    def get(self):
        # Lancer la recherche d'une pièce
        return jsonify({'status': 204})

class IdentifyPiece(Resource):
    def get(self):
        # Lancer l'identification de la pièce
        return jsonify({'status': 204})

class EndOfTour(Resource):
    def get(self):
        # Choisir ce que l'on fait
            # Relancer un tour
            # Vidanger le bac de récupération
            # Changer le bac
        return jsonify({'status': 204})
