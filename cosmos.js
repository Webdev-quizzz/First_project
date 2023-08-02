const questions=[
    {
        question: "Which is the nearest star to planet earth after the sun?",
        answers:[
            {text: "Alpha centauri", ans: false},
            {text: "Proxima centauri", ans: true},
            {text: "Sirus A", ans: false},
            {text: "Pole star", ans: false}
        ]
    },
    {
        question: "Which is the hottest planet in our solar system?",
        answers:[
            {text: "Mercury", ans: false},
            {text: "Earth", ans: false},
            {text: "Venus", ans: true},
            {text: "Jupiter", ans: false}
        ]
    },
    {
        question: "The comets are made up of?",
        answers:[
            {text: "Dust", ans: false},
            {text: "Ice", ans: false},
            {text: "Rock", ans: false},
            {text: "All of the above", ans: true}
        ]
    },
    {
        question: "1 Astronomical unit is approximately equal to how many meters?",
        answers:[
            {text: "1.5 * 10^11", ans: true },
            {text: "1.7 * 10^11", ans: false},
            {text: "1.4 * 10^11", ans: false},
            {text: "1.8 * 10^11", ans: false}
        ]
    },
    {
        question: "The outer planets (jupiter,Saturn,Uranus,Neptune) are primarily made up of?",
        answers:[
            {text: "Ice", ans: false},
            {text: "Rock", ans: false},
            {text: "Gas", ans: true},
            {text: "None of the above", ans: false}
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