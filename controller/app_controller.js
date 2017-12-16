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

        console.log(JSON.stringify(media, null, 2))

        var mediaToReplacePlaceholders = [
            body.Title, body.Rating, body.Genre, body.Media
        ]

        models.addMedia(mediaToReplacePlaceholders, function (result) {

            res.json(result)

        })

    })

    app.post("/media/:id/move", function (req, res) {
        console.log("id to move " + req.params.id)

        models.moveMedia(req.params.id, function () {

            res.status(204).json({})

        })
    })

    app.post("/media/:id/move", function (req, res) {
        console.log("id to move " + req.params.id)

        models.deleteMedia(req.params.id, function () {

            res.status(204).json({})

        })
    })

}