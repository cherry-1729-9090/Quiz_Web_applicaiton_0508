// script.js
let start_page = document.querySelector("#Start");
let game_button = document.querySelector(".neon-button");
let game = document.querySelector("#Game");
let end = document.querySelector("#End");

game_button.addEventListener('click', () => {
    start_page.style.display = "none";
    game.style.display = "block";
    startGame();
});

let question_array = [
    {
        question: "What is 2+2?",
        option_1: "4",
        option_2: "3",
        option_3: "5",
        option_4: "6",
        answer: "op1",
    },
    {
        question: "What is the capital of France?",
        option_1: "Berlin",
        option_2: "Madrid",
        option_3: "Paris",
        option_4: "Rome",
        answer: "op3",
    },
    {
        question: "What is the largest planet in our solar system?",
        option_1: "Earth",
        option_2: "Mars",
        option_3: "Jupiter",
        option_4: "Saturn",
        answer: "op3",
    },
    {
        question: "What element does 'O' represent on the periodic table?",
        option_1: "Osmium",
        option_2: "Oxygen",
        option_3: "Gold",
        option_4: "Oganesson",
        answer: "op2",
    },
    {
        question: "Who is the Chief Minister of AndhraPradesh?",
        option_1: "Jagan Mohan Reddy",
        option_2: "Pavan Kalyan",
        option_3: "Nara Chandra babu Naidu",
        option_4: "K A Paul",
        answer: "op4",
    }
];

let currQuestionIdx = 0; // setting the current index of the question to be 0 ,i.e, start.
let currScore = 0;
let LastScore = 0;

const startGame = () => {
    // Reset score and question index when starting the game
    currQuestionIdx = 0;
    currScore = 0;
    LastScore = 0;
    changeQuestion(currQuestionIdx);
};

const changeQuestion = (questionIdx) => {
    let question = question_array[questionIdx];
    let currQuestion = document.querySelector(".question");

    if (questionIdx < question_array.length) {
        changeProgress(questionIdx);
        currQuestion.innerText = question.question;
        let options = document.querySelectorAll(".option-sentence");
        let optionKeys = ["option_1", "option_2", "option_3", "option_4"];
        options.forEach((option, idx) => {
            option.innerText = question[optionKeys[idx]];
            option.style.backgroundColor = "white";
            option.style.color = "black";
            option.onclick = () => handleOptionClick(option, question, questionIdx);
        });
    }
};

const handleOptionClick = (option, question, questionIdx) => {
    let selected = option.id;
    let toBeVerified = option;
    let answer = question.answer;
    if (selected !== answer) {
        toBeVerified.style.backgroundColor = "red";
        toBeVerified.style.color = "white";
    } else {
        toBeVerified.style.backgroundColor = "green";
        toBeVerified.style.color = "white";
        currScore += 10;
        LastScore += 10;
    }
    setTimeout(() => {
        if (questionIdx + 1 < question_array.length) {
            currQuestionIdx++;
            changeQuestion(currQuestionIdx);
        } else {
            game.style.display = "none"; // Hide the game when all questions are answered
            end.style.display = "flex";
            let finalScore = end.querySelector("#final-score");
            finalScore.innerText = LastScore;
        }
    }, 1000); // Delay in milliseconds before moving to the next question (adjust as needed)
};

const changeProgress = (currIdx) => {

    let number = game.querySelector("#question-progress h3 span");
    let score = game.querySelector("#current-score")
    if(currIdx < 3){
        number.innerText = currIdx + 1;
    }
    else{
        number.innerText = currIdx ;   
    }
    score.innerText  = currScore;
    let bar = game.querySelector("#inner-progress");
    bar.style.width = ((currIdx) * 20) + "%"; // Adjusting the width based on the current question index
};

// Event listeners for the restart and home buttons
document.querySelector("#restart").addEventListener('click', () => {
    currScore = 0;
    LastScore = 0;
    currQuestionIdx = 0;
    end.style.display = "none";
    game.style.display = "block";
    startGame();
});

document.querySelector("#home").addEventListener('click', () => {
    currScore = 0;
    LastScore = 0;
    currQuestionIdx = 0;
    end.style.display = "none";
    start_page.style.display = "block";
});
