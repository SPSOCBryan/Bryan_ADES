window.addEventListener('DOMContentLoaded', loadDom = () => {
    window.alert("DOM Loaded!")

    const goButton = document.getElementById('go-button');
    goButton.addEventListener('click', function () {
        var sessionId = document.getElementById('sessionId').value;
        localStorage.setItem('sessionId', sessionId);
        fetch('http://localhost:3000/session/'+sessionId,
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
            else if( json[0].isStarted==1){
                window.location = "/website/questions.html";
                localStorage.setItem('isStarted', 1);
                localStorage.setItem('sessionId', sessionId);
            }
            else if(json[0].isStarted==0){
                window.alert("Session is closed!");
                localStorage.setItem('isStarted', 0);
                localStorage.setItem('sessionId', sessionId);
            }
        })
    });

});