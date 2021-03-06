var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.json());
require('./server/config/database.js');
require('./server/config/routes.js')(app);
app.listen(8000, function() {
  console.log("listening on port 8000");
})