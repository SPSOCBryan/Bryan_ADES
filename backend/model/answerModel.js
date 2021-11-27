var db = require('../controller/databaseConfig');

var answerDB = {

    createAnswer: function (answer, questionId, sessionId, callback) {
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = `UPDATE questions SET answer=? WHERE questionId=? AND sessionId=?;`;

                conn.query(sql, [answer, questionId, sessionId], function (err, result) {
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
        });
    },

}


module.exports = answerDB;