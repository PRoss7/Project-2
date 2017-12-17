var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
<<<<<<< HEAD
var exphbs = require("express-handlebars"); 	
=======
var exphbs = require("express-handlebars")
<<<<<<< HEAD
=======

>>>>>>> 25a3b44b134bca567c8b728d9a301aab1cac36b9
>>>>>>> f2bdd311177223ebf184faf3543a0614366a0146
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
<<<<<<< HEAD

    //testing area

<<<<<<< HEAD
//    router.post();
=======
    // router.post();





=======
>>>>>>> 25a3b44b134bca567c8b728d9a301aab1cac36b9
>>>>>>> f2bdd311177223ebf184faf3543a0614366a0146
});