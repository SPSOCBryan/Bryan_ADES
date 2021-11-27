var db = require('../controller/databaseConfig');

var sessionDB = {

    createSession: function (sessionId, ownerId, isStarted, callback) {
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = `INSERT INTO session (sessionId, ownerId, isStarted) VALUES (?, ?, ?);`;

                conn.query(sql, [sessionId, ownerId, isStarted], function (err, result) {
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

    getSessionByID:function(sessionId, ownerId, callback){

        var dbConn=db.getConnection();

        //make connection to database 1st
        dbConn.connect(function(err){   //callback

            if(err) {
                console.log(err);

                //return err and null results
                return callback(err, null);
            }

            else{//connection success
                
                var sql="select * from session where sessionId=? AND ownerId=?"
                
                dbConn.query(sql, [sessionId, ownerId], function(err, result){ //run sql, array contain values to fill in the question mark

                    dbConn.end();

                    if(err){
                        console.log(err);

                    }
                    
                    return callback(err, result);
                });
            }
        });
    },

    userGetSessionByID:function(sessionId, callback){

        var dbConn=db.getConnection();

        //make connection to database 1st
        dbConn.connect(function(err){   //callback

            if(err) {
                console.log(err);

                //return err and null results
                return callback(err, null);
            }

            else{//connection success
                
                var sql="select * from session where sessionId=?"
                
                dbConn.query(sql, [sessionId], function(err, result){ //run sql, array contain values to fill in the question mark

                    dbConn.end();

                    if(err){
                        console.log(err);

                    }
                    
                    return callback(err, result);
                });
            }
        });
    },

    startSession:function(isStarted, sessionId, ownerId, callback){

        var dbConn=db.getConnection();

        //make connection to database 1st
        dbConn.connect(function(err){   //callback

            if(err) {
                console.log(err);

                //return err and null results
                return callback(err, null);
            }

            else{//connection success
                
                var sql="UPDATE session SET isStarted=? WHERE sessionId=? AND ownerId=?"
                
                dbConn.query(sql, [isStarted, sessionId, ownerId], function(err, result){ //run sql, array contain values to fill in the question mark

                    dbConn.end();

                    if(err){
                        console.log(err);

                    }
                    
                    return callback(err, result);
                });
            }
        });
    },

    stopSession:function(stop, sessionId, ownerId, callback){

        var dbConn=db.getConnection();

        //make connection to database 1st
        dbConn.connect(function(err){   //callback

            if(err) {
                console.log(err);

                //return err and null results
                return callback(err, null);
            }

            else{//connection success
                
                var sql="UPDATE session SET isStarted=? WHERE sessionId=? AND ownerId=?"
                
                dbConn.query(sql, [stop, sessionId, ownerId], function(err, result){ //run sql, array contain values to fill in the question mark

                    dbConn.end();

                    if(err){
                        console.log(err);

                    }
                    
                    return callback(err, result);
                });
            }
        });
    },

}


module.exports = sessionDB;