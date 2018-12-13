from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request
from bson import ObjectId

import json
from . import database
import pprint

db_interface = database.DatabaseInterface()
collection = db_interface.db.piece

class Piece(Resource):
    def get(self):
        res_query = collection.find()

        if(res_query.count() == 0):
            return jsonify({'status': 404, 'message': "No Piece object found in database"});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': str(len(res)) + " Piece objects were found", 'data': res, 'rowCount': len(res)})

    def post(self):
        new = {}

        for key, value in request.json.items():
            new[key] = value

        newId = collection.insert(new)
        new = collection.find_one({'_id': newId})
        new['_id'] = str(new['_id'])

        return jsonify({'status': 200, 'message': "Piece object was inserted", 'data': new})

class PieceByShape(Resource):
    def get(self, shape):
        res_query = collection.find({"shape": shape})

        if(res_query.count() == 0):
            return jsonify({'status': 404, 'message': "No Piece object has shape " + str(shape)});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': str(len(res)) + " Piece objects were found", 'data': res, 'rowCount': len(res)})

class PieceById(Resource):
    def get(self, _id):
        res_query = collection.find({"_id": ObjectId(_id)})

        if(res_query.count() == 0):
            return jsonify({'status': 404, 'message': "No Piece object has id " + str(_id)});

        res = []
        for item in res_query:
            item['_id'] = str(item['_id'])
            res.append(item)

        return jsonify({'status': 200, 'message': "Piece objects was found", 'data': res, 'rowCount': len(res)})
