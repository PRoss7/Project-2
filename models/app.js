// Import the ORM to create functions that will interact with the database.

var orm = require("../config/orm.js");

var media = {

    addMedia: function(media, cb) {
        orm.addMediaToWishlist(media, function(res) {
            cb(res);

        });
    },

    moveMedia: function(id, cb) {
        orm.moveMediaToViewed(id, function(res) {
            cb(res);
        });
    },

    deleteMedia: function(id, cb) {
        orm.deleteMediaFromWishlist(id, function(res) {
            cb(res);
        });
    },
}


module.exports = media;