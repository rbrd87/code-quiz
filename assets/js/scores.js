// The high scores are stored in local storage - this function will retrieve them and store them in a variable.
export function getHighScores() {
    var highScoresString = localStorage.getItem("highscores");

    if (highScoresString === null) {
        return [];
    }
    
    var highScores = JSON.parse(highScoresString);

    return highScores;
}

function showHighScores() {
    // Elements created to show the high scores
    var scoreContainerEl = document.createElement("section");
    scoreContainerEl.setAttribute("class", "wrapper")
    document.body.appendChild(scoreContainerEl);

    var scoreHeaderEl = document.createElement("h1");
    scoreHeaderEl.textContent = "High Scores";
    scoreContainerEl.appendChild(scoreHeaderEl);

    var scoreListEl = document.createElement("ol");
    scoreContainerEl.appendChild(scoreListEl);

    var backToStartEl = document.createElement("button");
    backToStartEl.setAttribute("id", "backToStart")
    backToStartEl.textContent = "Back to Start";
    scoreContainerEl.appendChild(backToStartEl);

    var clearScoresEl = document.createElement("button");
    clearScoresEl.textContent = "Clear Highscores";
    scoreContainerEl.appendChild(clearScoresEl);

    // Function to take the user back to the main screen when clicking the back to start button
    function backToStart() {
        window.location='./index.html';
    }

    backToStartEl.addEventListener("click", backToStart);

    // Function to clear the scores from local storage and reload the page
    function clearScores(event) {
        event.preventDefault();
        localStorage.clear();
        location.reload();
    }

    clearScoresEl.addEventListener("click", clearScores);

    var highScores = getHighScores();

    // After the high scores are retrieved, they are put into a list
    for (let i = 0; i < highScores.length; i++) {
        var scoreListItem = document.createElement("li");
        scoreListItem.style.fontWeight = "normal";

        scoreListItem.textContent =
            "Name: " + highScores[i].name + " // Score: " + highScores[i].score;

        scoreListEl.appendChild(scoreListItem)
    }
}

// Loads the highscore view on page load
window.onload = function pageLoad() {
    getHighScores()
    showHighScores()
}