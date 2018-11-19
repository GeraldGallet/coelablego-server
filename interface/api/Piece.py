from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request

import json
from . import database

db_interface = database.DatabaseInterface()
collection = db_interface.db.piece

class Piece(Resource):
    def get(self):
        res_query = collection.find()

        if(len(res_query) == 0):
            return jsonify({'status': 404, 'message': "No Piece object found in database"});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': str(len(res)) + "Piece objects were found", 'data': res, 'rowCount': len(res)})

    def post(self):
        new = {}
        for key, value in request.form.items():
            new[key] = value

        newId = collection.insert(new)
        new = collection.find_one({'_id': newId})
        new['_id'] = str(new['_id'])

        return jsonify({'status': 200, 'message': "Piece object was inserted", 'data': new})

class PieceByShape(Resource):
    def get(self, shape):
        res_query = collection.find({"shape": shape})

        if(len(res_query) == 0):
            return jsonify({'status': 404, 'message': "No Piece object has shape " + str(shape)});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': str(len(res)) + "Piece objects were found", 'data': res, 'rowCount': len(res)})
