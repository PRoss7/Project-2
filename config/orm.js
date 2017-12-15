var connection = require("../config/connection.js");



// Object for all our SQL statement functions.
var orm = {

    addMediaToWishlist: function(vals, cb) { //adds line into wishlist table 

        var queryString = "INSERT INTO wishlist (Title, Rating, Genre, Media) VALUES (?, ?, ?, ?)";

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

        });

    },



    moveMediaToViewed: function(id, cb) { //deletes media from "wishlist" table and adds it to "viewed" table
        connection.query("SELECT * FROM wishlist WHERE id = ?", [id], function(err, result) {

            if (err) {
                throw err;
            }

            var mediaToMove = result[0];
            console.log(mediaToMove);
            connection.query("INSERT INTO viewed (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.Title, mediaToMove.Rating, mediaToMove.Genre], function(err, result) {


                if (err) {
                    throw err;
                }

                connection.query("DELETE FROM wishlist WHERE id = ?", [id], function(err, result) {

                    if (err) {
                        throw err;
                    }

                    // cb(result);
                });
            })
        });
    },

    deleteMediaFromWishlist: function(id) { //deletes media from wishlist table and adds it to the "deleted" table

        connection.query("SELECT * FROM wishlist WHERE id = ?", [id], function(err, result) {

            if (err) {
                throw err;
            }

            console.log(JSON.stringify(result, null, 2));

            var mediaToMove = result[0];


            connection.query("INSERT INTO deleted (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.Title, mediaToMove.Rating, mediaToMove.Genre], function(err, result) {

                if (err) {
                    throw err;
                }

                connection.query("DELETE FROM wishlist WHERE id = ?", [id], function(err, result) {

                    if (err) {
                        throw err;
                    }

                    // cb(result);
                });
            });

        });
    },


};

//testing area

orm.deleteMediaFromWishlist(2);

//orm.moveMediaToViewed(1);

module.exports = orm;