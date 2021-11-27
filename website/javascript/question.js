window.addEventListener('DOMContentLoaded', loadDom = () => {
    window.alert("DOM Loaded!")
    const session = localStorage.sessionId;
    document.getElementById('sessionIdField').value = session;
    console.log(session);

    const askButton = document.getElementById('ask-button');
    askButton.addEventListener('click', function () {
        window.alert("Question Posted!");
        var question = document.getElementById('question').value;
        var sessionId = localStorage.sessionId;
        const questionData = {'question': question};
        fetch('http://localhost:3000/question/'+sessionId, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        })
        .then(function (response) {
        return response.json();
        })
        .then(function (json) {
            console.log(json);
        });
        
    });
});