
// all the questions will be in an array of objects .....

const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Leopard", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: "How many states does America have?",
        answers: [
            {text: "40", correct: false},
            {text: "45", correct: false},
            {text: "50", correct: true},
            {text: "55", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionNum = 0;
let score = 0;

function startQuiz(){
    currentQuestionNum = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionNum];
    let questionNum = currentQuestionNum + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    }); 
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
     const selectedBtn = e.target;
     const isCorrect = selectedBtn.dataset.correct === "true";
     if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
     }else{
        selectedBtn.classList.add("incorrect")
     }
     Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
     });
     nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionNum++
    if(currentQuestionNum < questions.length){
        showQuestion();
    }else {
        showScore();
    };
}

nextButton.addEventListener("click", () => {
    if(currentQuestionNum < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})



startQuiz();
