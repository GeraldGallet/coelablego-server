from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from pymongo import MongoClient

# Our very own imports
from api.Piece import *
from api.Bag import *

app = Flask(__name__)
api = Api(app)

CORS(app)

api.add_resource(Piece, '/piece', methods=['GET', 'POST'], endpoint="pieces")
api.add_resource(PieceByShape, '/piece/shape/<shape>', endpoint="piecebyshape")
api.add_resource(PieceById, '/piece/<_id>', endpoint="piecebyid")

api.add_resource(Bag, '/bag', methods=['GET', 'POST'], endpoint="bags")
api.add_resource(BagByName, '/bag/name/<name>', endpoint="bag")

@app.route("/")
def hello():
    return jsonify({'text': 'Hello World!'})
    #return 'Hello World!'


class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]}

class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)


api.add_resource(Employees, '/employees')
api.add_resource(Employees_Name, '/employees/<employee_id>')


if __name__ == '__main__':
    app.run(port=5002)
    #db_client = DatabaseInterface()
    #db_client.initiate()
