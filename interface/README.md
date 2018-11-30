# coelablego-server's git

## Front-end interface
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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
| /bag | POST | Insert a new bag in db | name and Any characteristic needed |
| /bag/name/:name | GET | Get a bag by its name | nothing |
