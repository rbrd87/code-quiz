// Variables to store the timeRemaining, the currentQuestion and the score
var timeRemaining = 0;
var currentQuestion = 0;
var score = 0;

// Variable to store elements in the HTMl
var messageEl = document.getElementById("message");
var timerEl = document.getElementById("timer")
var scoreEl = document.getElementById("quizScore");
var welcomeContainerEl = document.getElementById("start-screen");
var highScoresEl = document.getElementById("highscores");
var quizScoreEl = document.getElementById("quizScore");
var resultsContainerEL = document.getElementById("end-screen");
var questionContainerEl = document.getElementById("questions");
var hSCcontainerEl = document.createElement("section");
var scoreListEl = document.createElement("ol");
var highScoreHeaderEl = document.createElement("h1");

// Variable to play sounds if a question is right/wrong
var correctSound = document.getElementById("correctSound")
var incorrectSound = document.getElementById("incorrectSound")

// Add event listener to start button
document.getElementById("start").addEventListener("click", startQuiz);

// Function to start the timer for the quiz
function startQuiz() {
    startTimer();
    welcomeContainerEl.classList.add('hide');
    highScoresEl.classList.add('hide');
    quizScoreEl.classList.remove('hide');
    showQuestions();
}

// Timer Function
function startTimer() {
    timeRemaining = 60;

    const timeInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("time").textContent = timeRemaining + " seconds left";
        // When the time runs out the game is over and a function will be called to end the game
        if (timeRemaining === 0 || timeRemaining < 0) {
            clearInterval(timeInterval);
            //gameOver()
            console.log("Game Over!");
        }
    }, 1000);
}

// Function to call the questions and produce the next question when it has been answered
function showQuestions() {
    //Getting elements so the questions can be displayed correctly
    var questionContainerEl = document.getElementById("questions");
    questionContainerEl.classList.remove('hide');

    var questionHeader = document.getElementById("question-title");
    questionHeader.textContent = "Question " + questionList[currentQuestion].id;

    var choicesEl = document.getElementById("choices");
    choicesEl.textContent = "";

    var questionEl = document.createElement("p");
    questionEl.textContent = questionList[currentQuestion].question;
    questionEl.setAttribute("data-index", questionList[currentQuestion].correctAnswerIndex);
    choicesEl.appendChild(questionEl);

    var divEl = document.createElement("div");
    questionEl.appendChild(divEl);

    for (var i = 0; i < questionList[currentQuestion].answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = questionList[currentQuestion].answers[i];
        answerButton.setAttribute("data-index", [i]);
        questionEl.appendChild(answerButton)
    }

    // Added an event listener to compare the clicked button with the answer index
    questionEl.addEventListener("click", function (event) {
        var usersAnswer = event.target;

        if (usersAnswer.matches("button")) {
            var correctAnswerIndex = questionEl.getAttribute("data-index");
            var selectedAnswerIndex = usersAnswer.getAttribute("data-index");

            if (correctAnswerIndex === selectedAnswerIndex) {
                score++;
                correctSound.play();
                scoreEl.textContent = "Score: " + score;
                messageEl.textContent = "CORRECT! ✅";
                currentQuestion++;
                nextQuestion();
            } else {
                timeRemaining = timeRemaining - 10;
                incorrectSound.play();
                scoreEl.textContent = "Score: " + score;
                messageEl.textContent = "WRONG! ❌";
                currentQuestion++
                nextQuestion();
            }
        }
    });
}

// When the question is answered, the next question is rendered. When the last question is answered the endGame() function is called
function nextQuestion() {
    if (currentQuestion < questionList.length) {
        var questionContainerEl = document.getElementById("questions");
        questionContainerEl.classList.add('hide');
        showQuestions();
    } else {
        endGame();
    }
}

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
    hSCcontainerEl.setAttribute("class", "wrapper")
    document.body.appendChild(hSCcontainerEl);

    highScoreHeaderEl.textContent = "High Scores";
    hSCcontainerEl.appendChild(highScoreHeaderEl);

    hSCcontainerEl.appendChild(scoreListEl);

    restartGameButton()
    viewHighScoresButton()

    var highScores = getHighScores();

    //high scores retrieved from local storage and displayed in a list item
    for (let i = 0; i < highScores.length; i++) {
        const scoreListItem = document.createElement("li");
        scoreListItem.style.fontWeight = "normal";

        scoreListItem.textContent =
            "Name: " + highScores[i].name + " // Score: " + highScores[i].score;

        scoreListEl.appendChild(scoreListItem);
    }
    return;
}

function restartGameButton() {
    var restartButtonEl = document.createElement("button");
    restartButtonEl.textContent = "Start Again";
    hSCcontainerEl.appendChild(restartButtonEl);

    //function declared and event listener added to button to refresh page in order to start game again
    function restartGame(event) {
        event.preventDefault();
        location.reload();
    }

    restartButtonEl.addEventListener("click", restartGame);
}

function viewHighScoresButton() {
    var viewHighScoresEl = document.createElement("button");
    viewHighScoresEl.textContent = "View Highscore List";
    hSCcontainerEl.appendChild(viewHighScoresEl);

    //function declared and event listener added to button to refresh page in order to start game again
    function highScoresPage() {
        window.location = './highscores.html';
    }

    viewHighScoresEl.addEventListener("click", highScoresPage);
}

function endGame() {
    //elements removed in order to make way for score screen
    questionContainerEl.classList.add('hide');
    resultsContainerEL.classList.remove('hide');
    timerEl.classList.add('hide');
    messageEl.classList.add('hide');

    var userInputEl = document.getElementById("initials");
    var submitEl = document.getElementById("submit");

    // when clicked, the user's initials and score are pushed to the high score array and stored in local storage
    submitEl.addEventListener("click", function (event) {
        const newHighScore = {
            name: userInputEl.value,
            score: score,
        };

        let highScores = getHighScores();
        highScores.push(newHighScore);

        localStorage.setItem("highscores", JSON.stringify(highScores));

        resultsContainerEL.classList.add('hide');

        showHighScores();
    });
}