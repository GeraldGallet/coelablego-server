from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request
import pprint

import json
from . import database
from . import running_vars

class StartProcess(Resource):
    def get(self):
        return jsonify({'status': 204})

    def post(self):
        # Lancer le reset de la machine
        global running_vars
        running_vars = dict()

        running_vars['bag_to_do'] = request.json['bag']
        running_vars['number_of_bags'] = request.json['number']
        running_vars['bags_done'] = 0

        print(running_vars)
        return jsonify({'status': 204})

class IdentifyPiece(Resource):
    def post(self):
        # Récupération de la photo dans la requete
        # Identification de la pièce
        return jsonify({'status': 204})

class EndOfTour(Resource):
    def get(self):
        # Choisir ce que l'on fait
            # Relancer un tour
            # Vidanger le bac de récupération
            # Changer le bac
            # La machine a fini
        return jsonify({'status': 204})
