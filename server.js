var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var exphbs = require("express-handlebars"); 	

var exphbs = require("express-handlebars")
var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));

require("./controller/app_controller.js")(app);

app.set("view engine", "handlebars")

//app.use("/", routes);
app.set("views", "./public/startbootstrap-grayscale-gh-pages/")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))

app.get("/", function (req, res) {
    res.render("partials/index")
})


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);


    //testing area

//    router.post();
    // router.post();


});