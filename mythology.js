const questions=[
    {
        question: "Arjuna's bow's name was?",
        answers:[
            {text: "Gandiva", ans: true},
            {text: "Pinaka", ans: false},
            {text: "Rudra Dhari", ans: false},
            {text: "Sharanga", ans: false}
        ]
    },
    {
        question: "Who wrote Mahabharata and Ramayana?",
        answers:[
            {text: "Ved vyas and valmiki", ans: false},
            {text: "Anhinanda and Tulsi Das", ans: false},
            {text: "Valmiki and ved vyas", ans: true},
            {text: "Tulsi Das and Anhinanda", ans: false}
        ]
    },
    {
        question: "Lakshmana is considered to be the incarnation of whom?",
        answers:[
            {text: "Lord Vishnu", ans: false},
            {text: "Lord Shiva", ans: false},
            {text: "Lord brahma", ans: false},
            {text: "Sheshnag", ans: true}
        ]
    },
    {
        question: "Which weapon was given by lord shiva to arjuna?",
        answers:[
            {text: "Gandiva", ans: false},
            {text: "Chandrahasa", ans: false},
            {text: "Pashupatastra", ans: true},
            {text: "None of the above", ans: false}
        ]
    },
    {
        question: "Dhritarashtra and Gandhari had how many childen?",
        answers:[
            {text: "100", ans: false},
            {text: "99", ans: false},
            {text: "101", ans: true},
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