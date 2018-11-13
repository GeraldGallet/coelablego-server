'use strict';
module.exports = function(app) {

  app.route("/").get((req, res) => {
    return res.status(200).send("Welcome to the Node server !");
  });
  /*
  const User = require('../controllers/User');

  app.route('/user')
    .get(User.getAll)
    .put(User.create);

  app.route('/user/:id')
    .get(User.getOne)
    .put(User.update)
    .delete(User.delete);
    */
};
