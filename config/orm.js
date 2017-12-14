var connection = require("../config/connection.js");

var ob = {
    Title: 'testing',
    Rating: 'testing',
    Genre: 'testing',
    Media: 'testing'
};
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
            console.log(arr);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();

}
//objToSql(ob);
//console.log(objToSql(ob));
var vals = ['2wish', '2list', '2add', '2on'];
// Object for all our SQL statement functions.
var orm = {

    addMediaToWishlist: function(vals, cb) { //adds line into wishlist table 

        var queryString = "INSERT INTO wishlist (Title, Rating, Genre, Media) VALUES (?, ?, ?, ?)";
        //connection.query(queryString, [media.title, media.rating, media.genre, media.media], function(err, result) {
        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            console.log(queryString);

        });

    },



    moveMediaToViewed: function(id, cb) { //deletes media from "wishlist" table and adds it to "viewed" table
        connection.query("SELECT * FROM wishlist WHERE id = ?", [id], function(err, result) {

            if (err) {
                throw err;
            }
            console.log("move media" + result);
            var mediaToMove = result;

            connection.query("INSERT INTO viewed (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.Title, mediaToMove.Rating, mediaToMove.Genre], function(err, result) {

                if (err) {
                    throw err;
                }

                connection.query("DELETE FROM wishlist WHERE id = ?", [id], function(err, result) {

                    if (err) {
                        throw err;
                    }

                    cb(result);
                });
            })
        });
    },

    deleteMediaFromWishlist: function(id) { //deletes media from wishlist table and adds it to the "deleted" table

        connection.query("SELECT * FROM wishlist WHERE id = ?", [id], function(err, result) {

            if (err) {
                throw err;
            }
            //  var mediaToMove = objToSql(result);

            console.log(JSON.stringify(result, null, 2));

            var mediaToMove = result[0];
            // var queryString = "INSERT INTO deleted"
            // queryString += mediaToMove;


            // console.log("delete from wishlist " + mediaToMove.RowDataPacket);
            // console.log("try" + queryString);
            connection.query("INSERT INTO deleted (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.Title, mediaToMove.Rating, mediaToMove.Genre], function(err, result) {
                // connection.query("INSERT INTO deleted (Title, Rating, Genre) VALUES (?, ?, ?)", [mediaToMove.Title, mediaToMove.Rating, mediaToMove.Genre], function(err, result) {

                if (err) {
                    throw err;
                }

                //     connection.query("DELETE FROM wishlist WHERE id=?", [id], function(err, result) {

                //         if (err) {
                //             throw err;
                //         }



                //     });

            });

        });
    },


};
var all = function(id) {
    var queryString = "SELECT * FROM wishlist WHERE id = ?";
    connection.query(queryString, [id], function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });
};

//all(13);
// all: function (tableInput, cb) {
//     var queryString = "SELECT * FROM " + tableInput + ";";
//     connection.query(queryString, function(err, result) {
//       if (err) {
//         throw err;
//       }
//       console.log(result);
//     });
//   },

// An example of objColVals would be {name: panther, sleepy: true}
// update: function(table, objColVals, condition, cb) {
//         var queryString = "UPDATE " + table;

//         queryString += " SET ";
//         queryString += objToSql(objColVals);
//         queryString += " WHERE ";
//         queryString += condition;

//         console.log(queryString);
//         connection.query(queryString, function(err, result) {
//             if (err) {
//                 throw err;
//             }

//             cb(result);
//         });
//     },
//testing

//orm.addMediaToWishlist(vals);

//orm.moveMediaToViewed(11);

orm.deleteMediaFromWishlist(3);


module.exports = orm;