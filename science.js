const questions=[
    {
        question: "What is the name of the smallest bone in the human body?",
        answers:[
            {text: "Femur", ans: false},
            {text: "Stapes", ans: true},
            {text: "Malleus", ans: false},
            {text: "Phalanges", ans: false}
        ]
    },
    {
        question: "As we increase our distance from earth the effect on gravity is?",
        answers:[
            {text: "It remains the same", ans: false},
            {text: "It increases", ans: false},
            {text: "It decreases", ans: true},
            {text: "None of the above", ans: false}
        ]
    },
    {
        question: "Which of the following is the primary function of the enzyme amylase?",
        answers:[
            {text: "Breaking down proteins", ans: false},
            {text: "Breaking down lipids", ans: false},
            {text: "Breaking down carbohydrates", ans: true},
            {text: "Synthesizing DNA", ans: false}
        ]
    },
    {
        question: "Which acid is found in tomato?",
        answers:[
            {text: "Oxalic acid", ans: true},
            {text: "Malic acid", ans: false},
            {text: "Citric acid", ans: false},
            {text: "None of the above", ans: false}
        ]
    },
    {
        question: "One can do pushups because of which law of motion?",
        answers:[
            {text: "1st law of motion", ans: false},
            {text: "2nd law of motion", ans: false},
            {text: "3rd law of motion", ans: true},
            {text: "All of the above", ans: false}
        ]
    }
]

let index = 0;
let score = 0;

const queBox = document.getElementById('que');
const option_div = document.getElementById('options-div'); 
const next_Button = document.getElementById('next-btn');

function startQuiz ()
{
    index = 0;
    score = 0;
    next_Button.innerText = "Next";
    loadQuestion();
}


function loadQuestion()
{
    resetState();
    let data = questions[index];
    queBox.innerText = `${index+1}. ${data.question}` ;
    
    data.answers.forEach(option =>{
        const button = document.createElement('button');
        button.innerText = option.text ;
        button.classList.add('btn');
        button.dataset.correct = option.ans;

        option_div.appendChild(button);
        button.addEventListener('click', check);
    })
}


function resetState()
{
    next_Button.style.display = 'none';
    while (option_div.firstChild) {
        option_div.removeChild(option_div.firstChild);
    }
}


function check(b)
{
    let btn = b.target;
    if (btn.dataset.correct == 'true') {
        btn.classList.add('correct');
        score++;
    }
    else {
        btn.classList.add('incorrect');
    }
    
    Array.from(option_div.children).forEach(button => {
        if (button.dataset.correct == 'true') {
            button.classList.add('correct');
        }
        button.disabled = true ;
    })

    next_Button.style.display = 'block' ;
}



next_Button.addEventListener('click', () => {
    if (index < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

function handleNextButton()
{
    index++;
    if (index < questions.length) {
        loadQuestion();
    }
    else {
        showScore();
    }
}


function showScore()
{
    resetState();
    queBox.innerHTML = `Your score is ${score} out of ${questions.length}`;
    next_Button.style.display = 'block' ;
    next_Button.innerText = "Play Again";
}


startQuiz();