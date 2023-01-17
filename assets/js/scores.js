//high scores stored as an array in local storage. Function here declared to retrieve them
function getHighScores() {
    var highScoresString = localStorage.getItem("highscores");

    if (highScoresString === null) {
        return [];
    }

    var highScores = JSON.parse(highScoresString);

    return highScores;
}

function showHighScores() {
    //elements created/amended/appended for the high score page
    var hSCcontainerEl = document.createElement("section");
    hSCcontainerEl.setAttribute("class", "wrapper")
    document.body.appendChild(hSCcontainerEl);

    var hSHeaderEl = document.createElement("h1");
    hSHeaderEl.textContent = "High Scores";
    hSCcontainerEl.appendChild(hSHeaderEl);

    var scoreListEl = document.createElement("ol");
    hSCcontainerEl.appendChild(scoreListEl);

    var backToStartEl = document.createElement("button");
    backToStartEl.setAttribute("id", "backToStart")
    backToStartEl.textContent = "Back to Start";
    hSCcontainerEl.appendChild(backToStartEl);

    var clearScoresEl = document.createElement("button");
    clearScoresEl.textContent = "Clear Highscores";
    hSCcontainerEl.appendChild(clearScoresEl);

    //function declared and event listener added to button to refresh page in order to start game again
    function backToStart() {
        window.location='./index.html';
    }

    backToStartEl.addEventListener("click", backToStart);

    //function declared and event listener added to button in order to clear high scores
    function clearScores(event) {
        event.preventDefault();
        localStorage.clear();
        highScores = 0;
        location.reload();
    }

    clearScoresEl.addEventListener("click", clearScores);

    var highScores = getHighScores();

    //high scores retrieved from local storage and displayed in a list item
    for (let i = 0; i < highScores.length; i++) {
        const scoreListItem = document.createElement("li");
        scoreListItem.style.fontWeight = "normal";

        scoreListItem.textContent =
            "Name: " + highScores[i].name + " // Score: " + highScores[i].score;

        scoreListEl.appendChild(scoreListItem);
    }
}

window.onload = function pageLoad() {
    getHighScores()
    showHighScores()
}