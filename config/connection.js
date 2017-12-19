var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "PAR/8628490",
    database: "media_trailerdb"
});

connection.connect(function (err) {

    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id: " + connection.threadId);

});
module.exports = connection;