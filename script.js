var timeEl = document.querySelector(".iTime")
// made this into a variable for reusability
var questionsEl = document.querySelector(".questions-rendered");

var secondsLeft = 75;
var penaltySeconds = 10;
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
    // moved this call up here so that the first question is only rendered once the player
    // clicks "Start Quiz"
    displayQuestions();
})

// setting up 'questionIndex' to act as a pointer to the current index in the questions array;
// this acts like the 'var i' inside a for loop, but will be manually incremented to allow
// the code to trigger the next question only when the previous question is answered
var questionIndex = 0;

// function to display the current question/answers
function displayQuestions() 
{
    // clearing out the HTML from the previous question, to clear the slate for the current one
    questionsEl.textContent = "";

    // variable to hold a reference to the current question; it is pulled from the questions
    // array based on the current value of the 'questionIndex' variable
    var question = questions[questionIndex];

    // wrapper div to hold the question and all of its answers, will later be inserted into the HTML
    var questionDiv = document.createElement("div");

    // creating paragraph to hold the question text itself, storing it inside the variable 
    var questionText = document.createElement("p");
    // pulling the question text from the question object, setting it as text of the paragraph
    questionText.textContent = question.title; 
    // adding the paragraph (containing the question text) to the wrapper div
    questionDiv.appendChild(questionText)

    // looping through each of the answers in the current question's choices array
    for (i = 0; i < question.choices.length; i++) 
    {
        // for each answer, all of the below steps happen:

        // creating a new button element and store it in the 'answer' variable
        var option = document.createElement("button");
        // storing the text of the current option inside the newly-created button
        option.textContent = question.choices[i];
        // adding a class of 'option' to each button (to make wiring up a click event more straightforward)
        option.setAttribute("class", "option");
        // adding a click event for the newly-created button
        option.addEventListener("click", function(e) 
        {
            alert("clicked on an option");
            // YOUR LOGIC GOES HERE:
                // 1) get the answer the user clicked on and compare it to the correct answer
                var optionClicked = (e.target.innerHTML); 
                if(optionClicked === questions[questionIndex].correctAnswer)
                {
                    alert("correct");
                    displayQuestions(questionIndex++);
                }
                else
                    {
                        alert("incorrect");
                        displayQuestions(questionIndex++);
                    }
                // 2) likely add to correct/incorrect counters
                // 3) increment 'questionIndex', to change pointer to next question
                // 4) call 'displayQuestions' function, which will then render the next question
                // 5) potentially reset timer? (or is timer for all questions?)
                // 6) consider moving this functionality into a separate function, maybe?
        })
        // then adding the new button (containing the answer text) to the wrapper div
        questionDiv.appendChild(option);
    }

    // by the time you reach this point in the code, you now have a question wrapper div
    // ('questionDiv') that contains a paragraph containing the question, and four buttons
    // containing the answers...

    // the next step is putting the wrapper div on the page!
    questionsEl.appendChild(questionDiv);
}