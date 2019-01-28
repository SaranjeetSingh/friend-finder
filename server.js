var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var routes = require("./app/routing/htmlroutes.js");
var routes1 = require("./app/routing/apiroutes.js");

app.use(routes);
app.use(routes1);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
