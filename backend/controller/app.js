// Import required modules
const express = require('express');
const cors = require('cors');
const { nanoid, customAlphabet } = require('nanoid')
const sessionDB = require('../model/sessionModel');
const questionDB = require('../model/questionModel');
const answerDB = require('../model/answerModel');
const app = express();
const port = 3000;
// const session = { sessionId: 1 };
var bodyParser = require('body-parser');  
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors())
app.use(urlencodedParser)
app.use(jsonParser)

app.get('/products/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// endpoint that creates a session, generates both IDs and inserts into a db
app.post('/session', function (req, res) {

    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
    const sessionId = nanoid();
    const ownerId = nanoid();
    const isStarted = 0;

    res.json({
        session_id: sessionId,
        owner_id: ownerId,
        is_started: isStarted
    });
    console.log(sessionId+', '+ownerId+', '+isStarted);

    sessionDB.createSession(sessionId, ownerId, isStarted, function (err) {
        if (!err) {
            res.status(200).send("Session Created!");
        } else {
            res.status(500).send("Unknown error");
        }
    });
});

app.post('/question/:session_id', function (req, res) {

    console.log('Go jek');
    console.log(req.body);
    var sessionId = req.params.session_id;
    var question = req.body.question;
    
    questionDB.createQuestion(sessionId, question, function (err) {
        if (!err) {
            res.status(200).send('Question Posted!');
        } else {
            res.status(500).send("Unknown error");
        }
    });
});

app.put('/answer/:session_id/:question_id', function (req, res) {

    var questionId = req.params.question_id;
    console.log(questionId);
    var answer = req.body.answer;
    console.log(answer);
    var sessionId = req.params.session_id;
    console.log(sessionId);
    
    answerDB.createAnswer(answer, questionId, sessionId, function (err) {
        if (!err) {
            res.status(200).send('Answer Posted!');
        } else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/session/:sessionId/:ownerId', function (req, res) {

    var sessionId = req.params.sessionId;
    var ownerId = req.params.ownerId;

    sessionDB.getSessionByID(sessionId, ownerId, function (err, result) {

        if (err) {
            res.status(500);
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.send(result);
        }
    });
})

app.get('/session/:sessionId', function (req, res) {

    var sessionId = req.params.sessionId;

    sessionDB.userGetSessionByID(sessionId, function (err, result) {

        if (err) {
            res.status(500);
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.send(result);
        }
    });
})

app.get('/questions/:sessionid/:questionid', function (req, res) {

    var sessionid = req.params.sessionid;
    var questionid = req.params.questionid;

    questionDB.getQuestions(sessionid, questionid, function (err, result) {

        if (err) {
            res.status(500);
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.send(result);
        }
    });
})

app.get('/questions/:sessionid', function (req, res) {

    var sessionid = req.params.sessionid;

    questionDB.getAllQuestions(sessionid, function (err, result) {

        if (err) {
            res.status(500);
            res.send(`{"Message":"Internal Server Error"}`);
        }
        else {
            res.status(200);
            res.send(result);
        }
    });
})

app.put('/startSession', function (req, res, next) {

    const sessionId = req.body.session_id;
    const ownerId = req.body.owner_id;
    const isStarted = 1;

    sessionDB.startSession(isStarted, sessionId, ownerId, function (err) {
        if (!err) {
            res.status(200).send("Session Started!");
        } else {
            res.status(500).send("Unknown error");
        }
    });
});

app.put('/stopSession', function (req, res, next) {

    const sessionId = req.body.session_id;
    const ownerId = req.body.owner_id;
    const stop = 0;

    sessionDB.stopSession(stop, sessionId, ownerId, function (err) {
        if (!err) {
            res.status(200).send("Session Stopped!");
        } else {
            res.status(500).send("Unknown error");
        }
    });
});