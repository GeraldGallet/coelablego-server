from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request
import pprint
from bson import ObjectId

import json
from . import database
from . import running_vars

db_interface = database.DatabaseInterface()
bag_collection = db_interface.db.bag
piece_collection = db_interface.db.piece

class StartProcess(Resource):
    def get(self):
        return jsonify({'status': 204})

    def post(self):
        # Lancer le reset de la machine
        global running_vars
        running_vars = dict()

        running_vars['bag_to_do'] = []
        running_vars['number_of_bags'] = request.json['number']
        running_vars['bags_done'] = 0
        running_vars['trash_bag'] = []

        res_query = bag_collection.find_one({"_id": ObjectId(request.json['bag'])})
        for piece in res_query['pieces']:
            for i in range(0, piece[1]):
                running_vars['bag_to_do'].append(piece[0])

        running_vars['current_bags'] = [running_vars['bag_to_do'], running_vars['bag_to_do'], running_vars['bag_to_do']]
        print("--- running_vars ---")
        print(running_vars)
        return jsonify({'status': 204})

class IdentifyPiece(Resource):
    def post(self):
        # Recuperation de la photo dans la requete
        # Identification de la piece par le programme d'Axel
        return jsonify({'status': 204})

class EndOfTour(Resource):
    def get(self):
        global running_vars

        # Changement de bac
        if(not(running_vars['current_bags'][0])):
            running_vars['bags_done'] = running_vars['bags_done'] + 1
            if(running_vars['bags_done'] <= (running_vars['bags_done'] - 3)):
                running_vars['current_bags'][0] = running_vars['bag_to_do']
                print("Change bag 1")

        if(not(running_vars['current_bags'][1])):
            running_vars['bags_done'] = running_vars['bags_done'] + 1
            if(running_vars['bags_done'] <= (running_vars['bags_done'] - 3)):
                running_vars['current_bags'][1] = running_vars['bag_to_do']
                print("Change bag 2")

        if(not(running_vars['current_bags'][2])):
            running_vars['bags_done'] = running_vars['bags_done'] + 1
            if(running_vars['bags_done'] <= (running_vars['bags_done'] - 3)):
                running_vars['current_bags'][2] = running_vars['bag_to_do']
                print("Change bag 3")

        # Le travail de la machine est fini
        if(running_vars['bags_done'] == running_vars['number_of_bags']):
            return

        # Vidanger le bac de recuperation
        if(len(running_vars['trash_bag']) >= 30):
            print("Vidange du bac")
            running_vars['trash_bag'] = []
            return

        # Relancer un tour
        return jsonify({'status': 204})
