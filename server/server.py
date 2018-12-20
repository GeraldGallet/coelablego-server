from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from pymongo import MongoClient

# Our very own imports
from api.Piece import *
from api.Bag import *
from api.Control import *

app = Flask(__name__)
api = Api(app)

CORS(app)

api.add_resource(Piece, '/piece', methods=['GET', 'POST'], endpoint="pieces")
api.add_resource(PieceByShape, '/piece/shape/<shape>', endpoint="piecebyshape")
api.add_resource(PieceById, '/piece/<_id>', endpoint="piecebyid")

api.add_resource(Bag, '/bag', methods=['GET', 'POST'], endpoint="bags")
api.add_resource(Bag, '/bag/<_id>', methods=['PUT'], endpoint="update_bag")
api.add_resource(BagByName, '/bag/name/<name>', endpoint="bag")

api.add_resource(StartProcess, '/start', methods=['GET', 'POST'], endpoint="start_process")
api.add_resource(IdentifyPiece, '/identify_piece', methods=['POST'], endpoint="identify_piece")
api.add_resource(EndOfTour, '/end_of_tour', endpoint="end_of_tour")
api.add_resource(BeginNewPiece, '/begin_new_piece', methods=['POST'], endpoint='beginnewpiece')
api.add_resource(NewPhotoNewPiece, '/new_photo_new_piece', methods=['POST'], endpoint='newphotonewpiece')
api.add_resource(SaveNewPiece, '/save_new_piece', methods=['POST'], endpoint='savenewpiece')


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
    app.run(port=5002, host='0.0.0.0')
    #db_client = DatabaseInterface()
    #db_client.initiate()
