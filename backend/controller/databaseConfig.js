var mysql = require('../node_modules/mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "mIchell3fromsw1tzerland",
            database: "ades_ca2"
        });
        return conn;
    }
};

module.exports = dbconnect