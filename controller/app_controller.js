var models = require("../models/app.js");

module.exports = function (app) {


    app.post("/media/add", function (req, res) {
        var body = req.body
        /**
         * {
         *   "Title": "Pulp Fiction",
         *   "Rating": "4",
         *   "Genre": "Action/Thriller",
         *   "Media": "Movie"
         * }
         */

        //console.log(JSON.stringify(media, null, 2))

        var mediaToReplacePlaceholders = [
            body.Title, body.Rating, body.Genre, body.Media
        ]

        models.addMedia(mediaToReplacePlaceholders, function (result) {

            res.json(result)
                //res.redirect
                //res.render("templste",{})

        })

    })

    app.post("/media/:id/move", function (req, res) {
        console.log("id to move " + req.params.id)

        models.moveMedia(req.params.id, function () {

            res.status(204).json({})

        })
    })

<<<<<<< HEAD
    app.post("/media/:id/delete", function(req, res) {
        console.log("id to delete " + req.params.id)
=======
    app.post("/media/:id/move", function (req, res) {
        console.log("id to move " + req.params.id)
>>>>>>> 25a3b44b134bca567c8b728d9a301aab1cac36b9

        models.deleteMedia(req.params.id, function () {

            res.status(204).json({})

        })
    })

}