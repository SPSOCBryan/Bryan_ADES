window.addEventListener('DOMContentLoaded', loadDom = () => {
    window.alert("DOM Loaded!")

    const newButton = document.getElementById('new-button');
    newButton.addEventListener('click', function () {
        window.alert("Session is created!");
        fetch('http://localhost:3000/session', {method: 'POST'})
        .then(function (response) {
        return response.json();
        })
        .then(function (json) {
            console.log(json);
            const sessionId = json.session_id;
            const ownerId = json.owner_id;
            const isStarted = json.is_started;
            document.getElementById('sessionId').value = sessionId;
            document.getElementById('ownerId').value = ownerId;
            localStorage.setItem('sessionId', sessionId);
            localStorage.setItem('ownerId', ownerId);
            localStorage.setItem('isStarted', isStarted);
        });
        
    });

    //listen for start button click and show alert
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
        var sessionId = document.getElementById('sessionId').value;
        var ownerId = document.getElementById('ownerId').value;
        const sessionData = {'session_id': sessionId, 'owner_id': ownerId, 'isStarted': 1};
        console.log(sessionData);
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('ownerId', ownerId);
        localStorage.setItem('isStarted', 1);
        window.alert("Session has started!");
        fetch('http://localhost:3000/startSession',
        {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
        })
        .then(function (response) {
        return response.json();
        })
        .then(function (json) {
            console.log(json);
        })
    });

    //listen for stop button click and show alert
    const stopButton = document.getElementById('stop-button');
    stopButton.addEventListener('click', function () {
        var sessionId = document.getElementById('sessionId').value;
        var ownerId = document.getElementById('ownerId').value;
        const sessionData = {'session_id': sessionId, 'owner_id': ownerId, 'isStarted': 0};
        console.log(sessionData);
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('ownerId', ownerId);
        localStorage.setItem('isStarted', 0);
        window.alert("Session has stopped!");
        fetch('http://localhost:3000/stopSession',
        {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
        })
        .then(function (response) {
        return response.json();
        })
        .then(function (json) {
            console.log(json);
        })
    });

    const goButton = document.getElementById('go-button');
    goButton.addEventListener('click', function () {
        var sessionId = document.getElementById('sessionId').value;
        var ownerId = document.getElementById('ownerId').value;
        fetch('http://localhost:3000/session/'+sessionId+'/'+ownerId,
        {
            method: 'GET',
        })
        .then(function (response) {
        return response.json();
        })
        .then(function (json) {
            console.log(json);
            if(json.length==0){
                window.alert("Bad Request!");
            }
            else if( json[0].isStarted==1 && json[0].ownerId==ownerId ){
                window.location = "/website/ownerQuestions.html";
                localStorage.setItem('isStarted', 1);
                localStorage.setItem('sessionId', sessionId);
                localStorage.setItem('ownerId', ownerId);
            }
            else if(json[0].isStarted==0){
                window.alert("Session is closed!");
                localStorage.setItem('isStarted', 0);
                localStorage.setItem('sessionId', sessionId);
                localStorage.setItem('ownerId', ownerId);
            }
        })
    });

});