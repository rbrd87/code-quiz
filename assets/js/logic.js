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

    var timeInterval = setInterval(function () {
        timeRemaining--;
        document.getElementById("time").textContent = timeRemaining + " seconds left";
        // When the time runs out the game is over and a function will be called to end the game
        if (timeRemaining === 0 || timeRemaining < 0) {
            clearInterval(timeInterval);
            endGame()
        }
    }, 1000);
}

// Function to call the questions and produce the next question when it has been answered
function showQuestions() {
    // Getting elements so the questions can be displayed correctly
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

function endGame() {
    // Elements are hidden so the user input fields can be shown
    questionContainerEl.classList.add('hide');
    resultsContainerEL.classList.remove('hide');
    timerEl.classList.add('hide');
    messageEl.classList.add('hide');

    var userInputEl = document.getElementById("initials");
    var submitEl = document.getElementById("submit");

    var finalScoreEl = document.getElementById("final-score")
    finalScoreEl.textContent = score;

    var finalMessageEl = document.getElementById("final-message")
   
    if (score <= 5) {
        finalMessageEl.textContent = "😬 maybe do a little more revision!";
    } else if ((score <= 8 && score >= 6)) {
        finalMessageEl.textContent = "😃 good job, why don't you try again?";
    } else if (score === 9) {
        finalMessageEl.textContent = "🤏 ooooo! So close! Try again, go for full marks!";
    } else if (score === 10) {
        finalMessageEl.textContent = "🎉 WELL DONE! FULL MARKS!";
    } else {
        finalMessageEl.classList.add('hide');
    }

    // When clicked, the user's initials and score are pushed to the high score array and stored in local storage
    submitEl.addEventListener("click", function () {
        var newHighScore = {
            name: userInputEl.value, // Wanted to add validation to this, but couldn't think of a way to do it and ran out of time.
            score: score,
        };

        var highScores = getHighScores();
        highScores.push(newHighScore);
        
        localStorage.setItem("highscores", JSON.stringify(highScores));
        
        window.location='./highscores.html';
    });
}

// The high scores are stored in local storage - this function will retrieve them and store them in a variable.
function getHighScores() {
    var highScoresString = localStorage.getItem("highscores");

    if (highScoresString === null) {
        return [];
    }

    var highScores = JSON.parse(highScoresString);

    return highScores;
}