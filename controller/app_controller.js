var models = require("../models/app.js");

module.exports = function(app) {


    app.post("/media/add", function(req, res) {
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

        models.addMedia(mediaToReplacePlaceholders, function(result) {

            res.json(result)
                //res.redirect
                //res.render("templste",{})

        })

    })

    app.post("/search", function(req, res) {
        MovieDB.searchMovie({ query: req.body.search }, (err, response) => {
            if (err) {
                console.log(err)
            } else {

                res.status(200).json(response.results[0]);


                // console.log(`Popularity:   ${response.results[0].popularity}
                // Title:   ${response.results[0].original_title}
                // Overview:  ${response.results[0].overview}
                // Date: ${response.results[0].release_date}`);

            }

        });
    });

    app.post("/media/:id/move", function(req, res) {
        console.log("id to move " + req.params.id)

        models.moveMedia(req.params.id, function() {

            res.status(204).json({})

        })
    })

    app.post("/media/:id/delete", function(req, res) {
        console.log("id to delete " + req.params.id)

        models.deleteMedia(req.params.id, function() {

            res.status(204).json({})

        })
    })

}