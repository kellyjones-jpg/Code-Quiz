var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store:",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
];

var timeEl = document.querySelector(".iTime")

var secondsLeft = 75;
var timerInterval;

function setTime() 
{
    timerInterval = setInterval(function() 
    {
        secondsLeft--;
        timeEl.textContent = "Time Remaining: " + secondsLeft;
        if(secondsLeft === 0) 
        {
            clearInterval(timerInterval);
        }

    }, 1000);
}

const startBtn = document.getElementById("start");
startBtn.addEventListener('click', function()
{
    setTime();
    startBtn.style.display = 'none';
})

var questionIndex = 0;
function displayQuestions()
{
    var question = questions[questionIndex];
    document.querySelector(".questions-dynamically-rendered-here").textContent = question.title;
}

displayQuestions
