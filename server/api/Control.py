from pymongo import MongoClient
from flask_restful import Resource
from flask_jsonpify import jsonify
import simplejson as json
from flask import request
import pprint
from bson import ObjectId
import requests
import math

import json
from . import database
from . import running_vars
from . import new_piece
from . import ip_arduino
from . import purpose_of_picture
from . import picture_taking

db_interface = database.DatabaseInterface()
bag_collection = db_interface.db.bag
piece_collection = db_interface.db.piece

image_to_write = '../images/image.jpg'
length_of_block = 1024

class StartProcess(Resource):
    def get(self):
        return jsonify({'status': 204})

    def post(self):
        print("--- START PROCESS ---")
        global running_vars

        if running_vars == {}:
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

            global ip_arduino
            #requests.get(ip_arduino + '/lancement')
            return jsonify({'status': 204})
        return jsonify({'status': 400})

class IdentifyPiece(Resource):
    def post(self):
        print("--- IDENTIFY PIECE ---")

        data = str(request.stream.read())
        print(data)

        global running_vars
        if(not(running_vars == {})):
            # Recuperation de la photo dans la requete
            # Identification de la piece par le programme d'Axel
            return jsonify({'status': 204})
        return jsonify({'status': 400})

class EndOfTour(Resource):
    def get(self):
        print("--- END OF TOUR ---");
        global running_vars
        global ip_arduino

        if not(running_vars == {}):

            # Changement de bac
            if not(running_vars['current_bags'][0]):
                running_vars['bags_done'] = running_vars['bags_done'] + 1
                if(running_vars['bags_done'] <= (running_vars['bags_done'] - 3)):
                    running_vars['current_bags'][0] = running_vars['bag_to_do']
                    requests.post(ip_arduino + '/changement_bac', data = "{\"key\": 1}")

            if not(running_vars['current_bags'][1]):
                running_vars['bags_done'] = running_vars['bags_done'] + 1
                if(running_vars['bags_done'] <= (running_vars['bags_done'] - 3)):
                    running_vars['current_bags'][1] = running_vars['bag_to_do']
                    requests.post(ip_arduino + '/changement_bac', data = "{\"key\": 2}")

            if not(running_vars['current_bags'][2]):
                running_vars['bags_done'] = running_vars['bags_done'] + 1
                if(running_vars['bags_done'] <= (running_vars['bags_done'] - 3)):
                    running_vars['current_bags'][2] = running_vars['bag_to_do']
                    requests.post(ip_arduino + '/changement_bac', data = "{\"key\": 3}")

            # Le travail de la machine est fini
            if running_vars['bags_done'] == running_vars['number_of_bags']:
                requests.get(ip_arduino + '/nouvelle_piece')
                return

            # Vidanger le bac de recuperation
            if len(running_vars['trash_bag']) >= 30:
                print("Vidange du bac")
                running_vars['trash_bag'] = []
                requests.get(ip_arduino + '/lancement')
                return

            # Relancer un tour
            requests.get(ip_arduino + '/nouvelle_piece')
            return jsonify({'status': 204})
        return jsonify({'status': 400})


class BeginNewPiece(Resource):
    def post(self):
        global new_piece
        # Debut du processus
        if not(new_piece == {}):
            return jsonify({'status': 400})

        new_piece['number_of_pictures'] = request.json['number']
        new_piece['url'] = []
        new_piece['caracs'] = []

        print(new_piece)
        return jsonify({'status': 204})

class NewPhotoNewPiece(Resource):
    def post(self):
        global new_piece
        global purpose_of_picture
        global picture_over

        if new_piece == {}:
            return jsonify({'status': 400})

        actual = request.json['actual']

        # Prendre la photo et la traiter
        requests.get(ip_arduino + '/lancement')
        purpose_of_picture = 1
        url = 'assets/pieces/image' + str(actual) + '.jpg'
        new_piece['url'].append(url)
        new_piece['caracs'].append({'carac': actual})

        print(new_piece)
        return jsonify({'status': 201, 'data': {'url': url}})

class SaveNewPiece(Resource):
    def post(self):
        global new_piece
        if new_piece == {}:
            return jsonify({'status': 400})

        if(request.json['save']):
            # Save in database
            print("New piece saved !")
        else:
            print("New piece discarded !")

        new_piece = {}
        return jsonify({'status': 204})

class BeginPicture(Resource):
    def post(self):
        global picture_taking

        data = str(request.stream.read())
        size_of_file = float(data[2:-1])
        expected_blocks = int(math.ceil(float(size_of_file) / float(length_of_block)))
        file_name = 'image_received.jpg'

        picture_taking['size_of_file'] = size_of_file
        picture_taking['expected_blocks'] = expected_blocks
        picture_taking['actual_block'] = 0
        picture_taking['actual_byte'] = 0
        picture_taking['file'] = file_name
        image_file = open(file_name, 'wb')
        image_file.close()

        print(" --- START OF JPG ---")
        print(picture_taking)
        return jsonify({'status': 204})

class PictureContent(Resource):
    def post(self):
        global picture_taking

        # On lit la donnee recue, et on la formate
        data = request.stream.read()
        #print(data[0])
        received_line = bytearray.fromhex(data.decode('latin-1'))#.decode('latin-1')
        picture_taking['actual_block'] += 1
        #print("Received block " + str(picture_taking['actual_block']))


        # Si c'est le dernier bloc, on le coupe pour ne pas avoir trop de donnees dans le fichier
        if(picture_taking['actual_block'] == picture_taking['expected_blocks']):
            stop = (picture_taking['size_of_file'] - (picture_taking['expected_blocks']-1)*length_of_block)
            received_line = received_line[0:int(stop)]
            print("Almost done !!!")

        # On stocke la partie que l'on vient de recevoir
        image_file = open(picture_taking['file'], 'ab')
        #print("Writing " + str(len(received_line)) + " characters for block " + str(picture_taking['actual_block']))
        image_file.write(received_line)
        image_file.close()

        return jsonify({'status': 204})

class PrintMessage(Resource):
    def post(self):
        data = str(request.stream.read())
        print(" --- RECEIVED FROM ESP --- ")
        print(data)
        return jsonify({'status': 204})
