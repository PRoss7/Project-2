var connection = require("../config/connection.js");

connection.connect(function(err) {

    if (err) {
        console.log("error connection: " + err.stack);
        return;
    }

    console.log("connected as id: " + connection.threadId);

});

var orm = {

    addMedia: function(media, cb) {

        var queryString = "INSERT INTO wishlist VALUES ???";
        connection.query(queryString, [media.title, media.rating, media.genre], function(err, result) {

            if (err) {
                throw err;
            }

            cb(result)

        });

    },

    moveMedia: function(id, cb) {
        connection.query("SELECT * FROM wishlist WHERE id = ?", [id], function(err, result) {

            if (err) {
                throw err;
            }
            var mediaToMove = result;

            connection.query("INSERT INTO viewed (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.title, media.ToMove.rating, mediaToMove.genre], function(err, result) {

                if (err) {
                    throw err;
                }

                connection.query("DELETE FROM wishlist WHERE id=?", [id], function(err, result) {

                    if (err) {
                        throw err;
                    }

                    cb(result);

                });


            });

        });
    },

    deleteMedia: function(id, cb) {

        connection.query("SELECT * FROM wishlist WHERE id = ?", [id], function(err, result) {

            if (err) {
                throw err;
            }
            var mediaToMove = result;

            connection.query("INSERT INTO deleted (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.title, media.ToMove.rating, mediaToMove.genre], function(err, result) {

                if (err) {
                    throw err;
                }

                connection.query("DELETE FROM wishlist WHERE id=?", [id], function(err, result) {

                    if (err) {
                        throw err;
                    }

                    cb(result);

                });


            });

        });
    },

};