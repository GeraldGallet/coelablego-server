from pymongo import MongoClient
import pprint

if __name__ == "__main__":
    client = MongoClient('mongodb://localhost:27017/')
    client.drop_database('lego_database')

    db = client.lego_database

    # Adding documents to the database
    lego1 = {'shape': 'rectangle',
            'color': '#00FF00',
            'width': 12,
            'length': 12,
            'height': 4,
			'imgUrl': 'assets/image1.jpg'}
    lego2 = {'shape': 'circle',
            'color': '#0000FF',
            'diameter': 12,
			'imgUrl': 'assets/image2.jpg'}

    res = db.piece.insert([lego1, lego2])
    carac1 = {'shape': 'rectangle',
              'color': '#00FF00',
              'size': 4826929,
              'piece': res[0]}

    carac2 = {'shape': 'circle',
              'color': '#0000FF',
              'size': 128546,
              'piece': res[1]}

    db.caracteristics.insert([carac1, carac2])

    #print(res)
    bag = {'name': "Sachet Exemple",
          'pieces': [[res[0], 2], [res[1], 3]],
			'imgUrl': 'assets/image3.jpg'}

    db.bag.insert(bag)

    # Just leaving here some examples
    '''
    # Getting a collection
    print("Getting a collection :")
    collection = db.piece
    pprint.pprint(collection)

    # Getting a single one
    print("Getting a single one :")
    piece1 = collection.find_one()
    pprint.pprint(piece1)

    # Querying one by column
    print("Querying one by column :")
    piece2 = collection.find_one({"shape": "circle"})
    pprint.pprint(piece2)

    # Querying multiple by column
    print("Querying multiple by column :")
    pieces = collection.find()
    for piece in pieces:
        pprint.pprint(piece)
    '''
