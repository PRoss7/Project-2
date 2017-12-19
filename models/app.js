// Import the ORM to create functions that will interact with the database.

var orm = require("../config/orm.js");

var media = {

    addMedia: function(media, cb) {
        orm.addMedia(media, function(res) {
            cb(res);

        });
    },

    moveMedia: function(id, cb) {
        orm.moveMedia(id, function(res) {
            cb(res);
        });
    },

    deleteMedia: function(id, cb) {
        orm.deleteMedia(id, function(res) {
            cb(res);
        });
    },
}


module.exports = media;