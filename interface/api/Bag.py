from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request

import json
from . import database

db_interface = database.DatabaseInterface()
collection = db_interface.db.bag

class Bag(Resource):
    def get(self):
        res_query = collection.find()

        if(len(res_query) == 0):
            return jsonify({'status': 404, 'message': "No Bag object found in database"});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': str(len(res)) + "Bag objects were found", 'data': res, 'rowCount': len(res)})

    def post(self):
        new = {}
        for key, value in request.form.items():
            new[key] = value

        res_verif = collection.find_one({'name': new['name']})
        if(len(res_verif) != 0):
            return jsonify({'status': 409, 'message': "A Bag object with the same name already exists"});

        newId = collection.insert(new)
        new = collection.find_one({'_id': newId})
        new['_id'] = str(new['_id'])

        return jsonify({'status': 200, 'message': "Bag object was inserted", 'data': new})

class BagByName(Resource):
    def get(self, name):
        res_query = collection.find_one({'name': name})

        if(len(res_query) == 0):
            return jsonify({'status': 404, 'message': "No Bag object has shape " + str(name)});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': str(len(res)) + "Bag object was found", 'data': res})
