var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

var routes = require("./controller.app_controller.js");

app.use("/", routes);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
}); 