var timeRemaining = 0;
var currentQuestion = 0;
var score = 0;

var scoreEl = document.getElementById("quizScore");
var welcomeContainerEl = document.getElementById("start-screen");
var highScoresEl = document.getElementById("highscores");
var quizScoreEl = document.getElementById("quizScore");

// Add event listener to start button
document.getElementById("start").addEventListener("click", startQuiz);

// Function to start the timer for the quiz
function startQuiz() {
    console.log("Hello World");
    startTimer();
    hideWelcome();
    showScores();
    //showQuestions();
}

// Timer Function
function startTimer() {
    timeRemaining = 60;

    const timeInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("time").textContent = timeRemaining + " seconds left";
        // When the time runs out the game is over and a function will be called to end the game
        if (timeRemaining === 0) {
            clearInterval(timeInterval);
            //gameOver()
            console.log("Game Over!");
        }
    }, 1000);
}

function hideWelcome() {
    welcomeContainerEl.setAttribute("class", "hide");
}

function showScores() {
    highScoresEl.setAttribute("class", "scores hide");
    quizScoreEl.setAttribute("class", "scores");
}

