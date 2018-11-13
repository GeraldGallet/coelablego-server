/* Importing all the packages we need */
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
const colors = require('colors');
const path = require('path');


/* Importing and loading the routes we configured */
var routes = require('./api/routes/routes');
routes(app);
console.log("Routes were imported".yellow);

/* Setting up the interface side */
app.use(express.static(__dirname + '/interface'));
app.get("/interface", (req, res) => {
  res.sendFile(path.join(__dirname+'/interface/index.html'));
});
console.log("Interface is running on /interface".yellow);

app.listen(port);
console.log(("The server is ready on port " + port).rainbow);
