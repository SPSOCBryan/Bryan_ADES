var db = require('../controller/databaseConfig');

var questionDB = {

    createQuestion: function (sessionId, question, callback) {
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = `INSERT INTO questions (sessionId, questionPosted) VALUES (?,?);`;

                conn.query(sql, [sessionId, question], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err, null);

                    } else {
                        console.log(result);

                        if (result.length == 0) {
                            // no result at all
                            return callback(null, null);
                        }
                        else {
                            return callback(null, result);
                        }
                    }
                });
            }
        })
    },

    getQuestions: function (questionId, sessionId, callback) {

        var dbConn = db.getConnection();

        //make connection to database 1st
        dbConn.connect(function (err) {   //callback

            if (err) {
                console.log(err);

                //return err and null results
                return callback(err, null);
            }

            else {//connection success

                var sql = 'select questionId, questionPosted, answer from questions where sessionid=? and questionid=?'

                dbConn.query(sql, [questionId, sessionId], function (err, result) { //run sql, array contain values to fill in the question mark

                    dbConn.end();

                    if (err) {
                        console.log(err);

                    }

                    return callback(err, result);
                });
            }
        });
    },

    getAllQuestions: function (sessionId, callback) {

        var dbConn = db.getConnection();

        //make connection to database 1st
        dbConn.connect(function (err) {   //callback

            if (err) {
                console.log(err);

                //return err and null results
                return callback(err, null);
            }

            else {//connection success

                var sql = "select questionId, questionPosted from questions where sessionid=?"

                dbConn.query(sql, [sessionId], function (err, result) { //run sql, array contain values to fill in the question mark

                    dbConn.end();

                    if (err) {
                        console.log(err);

                    }

                    return callback(err, result);
                });
            }
        });
    },

}


module.exports = questionDB;