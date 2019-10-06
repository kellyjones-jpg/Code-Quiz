var timeEl = document.querySelector(".iTime")
var questionsEl = document.querySelector(".questions-rendered");

var secondsRemaining = 75;
var penaltySeconds = 10;
var timerInterval;
var numCorrect = 0;
var questionIndex = 0;
var highScores;
var highScoresArray = [];
var score = 0;

const startBtn = document.getElementById("start");
const viewScoresBtn = document.getElementById("viewScores");
const initialsDiv = document.getElementById("initialsDiv");
const scoresDiv = document.getElementById("scoresDiv");

function setTime() {
    timerInterval = setInterval(function () {
        secondsRemaining--;
        timeEl.textContent = "Time Remaining: " + secondsRemaining;
        if (secondsRemaining === 0) {
            finish();
        }

    }, 1000);
}

function finish() {
    clearInterval(timerInterval);
    secondsRemaining = 0;
    document.querySelector(".iTime").innerHTML = "Done";
    questionsEl.textContent = "";
    score = numCorrect * (100 / questions.length);
    document.getElementById("choice-response").innerHTML = "Your final score is: " + score;
    initialsDiv.style.display = "block";
    document.getElementById("myInitials").value = "";
}

function getInitials() {
    if (highScoresArray.length === 0) {
        highScores = document.getElementById("myInitials").value + " - " + score;
    }
    else {
        highScores = " " + document.getElementById("myInitials").value + " - " + score;
    }

    highScoresArray.push(highScores);
    initialsDiv.style.display = "none";
    document.querySelector(".iTime").innerHTML = "High Scores";
    document.getElementById("choice-response").innerHTML = highScoresArray;
    scoresDiv.style.display = "block";
}

function startOver() {
    document.getElementById("choice-response").innerHTML = "";
    scoresDiv.style.display = "none";
    timeEl.textContent = "Time Remaining: 0";
    startBtn.style.display = "initial";
    viewScoresBtn.style.display = "initial";
}

function viewAllScores() {
    if (highScoresArray.length === 0) {
        document.getElementById("choice-response").innerHTML = "No Scores: "
    }
    else {
        document.getElementById("choice-response").innerHTML = "High Scores: " + highScoresArray;
    }
}

function clearScores() {
    highScoresArray = [];
    document.getElementById("choice-response").innerHTML = highScoresArray;
}

startBtn.addEventListener('click', function () {
    secondsRemaining = 75;
    setTime();

    numCorrect = 0;
    questionIndex = 0;

    startBtn.style.display = "none";
    viewScoresBtn.style.display = "none";

    document.getElementById("choice-response").innerHTML = "";

    displayQuestions();
})

function displayQuestions() {
    if (secondsRemaining <= 0 || questionIndex >= questions.length) {
        finish();
        return;
    }
    questionsEl.textContent = "";

    var question = questions[questionIndex];
    var questionDiv = document.createElement("div");
    var questionText = document.createElement("p");

    questionText.textContent = question.title;

    questionDiv.appendChild(questionText)

    for (i = 0; i < question.choices.length; i++) {
        var option = document.createElement("button");

        option.textContent = question.choices[i];

        option.setAttribute("class", "option");

        option.addEventListener("click", function (e) {
            var optionClicked = (e.target.innerHTML);
            if (optionClicked === questions[questionIndex].correctAnswer) {
                numCorrect++;
                document.getElementById("choice-response").innerHTML = "correct";
                displayQuestions(questionIndex++);
            }
            else {
                secondsRemaining = secondsRemaining - penaltySeconds;
                document.getElementById("choice-response").innerHTML = "wrong";
                displayQuestions(questionIndex++);
            }
        })
        questionDiv.appendChild(option);
    }

    questionsEl.appendChild(questionDiv);
}