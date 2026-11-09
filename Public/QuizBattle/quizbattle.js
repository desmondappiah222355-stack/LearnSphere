const subjectCards = document.querySelectorAll(".subject-card");
const subjectSelection = document.querySelector(".subject-selection");
const quizSection = document.querySelector("#quiz-section");
const quizHeading = document.querySelector("#quiz-heading");
const questionContainer = document.querySelector("#question-container");
const scoreDisplay = document.querySelector("#score-display");

let quizQuestions = {};
let selectedAnswer = null;


// Get the quiz questions from the JSON file
fetch("/Assets/questions.json")
    .then(response => response.json())
    .then(data => {
        quizQuestions = data;
        console.log("Quiz questions loaded!");
    })
    .catch(error => {
        console.error("Error loading questions:", error);
    });

// Initialize variables to keep track of the current question and score
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;


// Add event listeners to each subject card
subjectCards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedSubject = card.dataset.subject;
        nextBtn.hidden = false;


// Set the current questions based on the selected subject        
currentQuestions = quizQuestions[selectedSubject];
currentQuestionIndex = 0;
score = 0;

// Hide the subject selection and show the quiz section
        subjectSelection.hidden = true;
        quizSection.hidden = false;


// Update the quiz heading and display the first question
quizHeading.textContent = selectedSubject + " Quiz";
scoreDisplay.textContent = "Score: 0";

displayQuestion();
    });
});

//DISPLAY QUESTION FUNCTION
function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];

   

    questionContainer.innerHTML = `
    <h3 class="quiz-question">${question.question}</h3>
    <div class="options-container"></div>
`;

// Create buttons for each option and add event listeners
    question.options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option;
        button.addEventListener("click", () => {
    selectedAnswer = option;
    const allOptions = document.querySelectorAll(".option-btn");

    allOptions.forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
});

        button.classList.add("option-btn");

document.querySelector(".options-container").appendChild(button);
    });
}


// Add event listener to the next button
const nextBtn = document.querySelector("#next-btn");

nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) {
        alert("Please select an answer first!");
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    if (selectedAnswer === question.answer) {
        score++;
    }

    scoreDisplay.textContent = "Score: " + score;

    console.log("Score:", score);

    currentQuestionIndex++;
    selectedAnswer = null;

    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        questionContainer.textContent =
            "Quiz completed! Your score: " + score + "/" + currentQuestions.length;

        nextBtn.hidden = true;
    }

    });