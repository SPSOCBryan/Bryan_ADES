window.addEventListener('DOMContentLoaded', loadDom = () => {
    window.alert("DOM Loaded!")

    const answerButton = document.getElementById('answerButton');
    answerButton.addEventListener('click', function () {
        window.alert("Question answered!");
        var urlParams = new URLSearchParams(window.location.search);
        var questionID = urlParams.get('questionid');
        var answer = document.getElementById('answer').value;
        var sessionId = localStorage.sessionId;
        const answerData = {'answer': answer};
        fetch('http://localhost:3000/answer/'+sessionId+'/'+questionID, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answerData),
        })
        .then(function (response) {
        return response.json();
        })
        .then(function (json) {
            console.log(json);
        });
        
    });

});