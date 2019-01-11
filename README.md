# coelablego-server's git

## Front-end interface
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Back-end API
You can run the server by using the command :
```
$ python server.py
```
| route | request type | utility | needed |
| :------------- | :------------- | :------------- | :------------- |
| /piece | GET | Get a list of all pieces | nothing |
| /piece | POST | Insert a new piece in db | Any characteristic needed |
| /piece/shape/:shape | GET | Get a list of all pieces filtered by shape | nothing |
| /piece/:_id | GET | Get a piece by its id | nothing |
| /bag | GET | Get a list of all bags | nothing |
| /bag | POST | Insert a new bag in db | name, pieces (array of arrays of 2 strings) |
| /bag/:id | PUT | Modify a bag in db | name, pieces (array of arrays of 2 strings) |
| /bag/name/:name | GET | Get a bag by its name | nothing |
| /begin_new_piece | POST | Start the registering of a new piece | number |
| /new_photo_new_piece | POST | Take a photo for the new piece | actual |
| /save_new_piece | POST | Save or not the pictures taken | save |
