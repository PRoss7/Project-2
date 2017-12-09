var connection = require("../config/connection.js");

connection.connect(function (err) {

    if (err) {
        console.log("error connection: " + err.stack);
        return;
    }

    console.log("connected as id: " + connection.threadId);

});

var orm = {

    addMedia: function (media, cb) {

        var queryString = "INSERT INTO wishlist VALUES ??";
        connection.query(queryString, function (err, result) {

            if (err) {
                throw err;
            }

            cb(result);

        });

    },

    moveMedia: function (id, cb) {

        connection.query("DELETE FROM wishlist", function (err, result) {

            if (err) {
                throw err;
            }

            cb(result);

        });

        connection.query("INSERT INTO viewed (Title, Rating, Genre) VALUES (?, ?, ?)", [Title, Rating, Genre], function (err, result) {

            if (err) {
                throw err;
            }

            cb(result);

        });

    },

    deleteMedia: function (id, cb) {

        connection.query("SELECT * FROM wishlist", function (err, result) {

            if (err) {
                throw err;
            }

            cb(result);

        });

    }

};