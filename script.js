let questions = [
    {
        questions: "What is your favorite color?",
        answers: [
            {text: "Red", response: "red"},
            {text: "Green", response: "green"},
            {text: "Blue", response: "blue"},
            {text: "Yellow", response: "yellow"},
        ]
    },
    {
        questions: "What is your favorite pet?",
        answers: [
            {text: "Dog", response: "dog"},
            {text: "Cat", response: "cat"},
            {text: "Rabbit", response: "rabbit"},
            {text: "Lizard", response: "lizard"},
        ]
    },
    {
        questions: "What are you usually doing at 7PM?",
        answers: [
            {text: "Eat Dinner", response: "dinner"},
            {text: "Watch the Telescreen", response: "telescreen"},
            {text: "Participate in Community Events", response: "community"},
            {text: "I Like to Read", response: "read", wrong: true},
        ]
    }, 
    {
        questions: "Which of these do you usually like to consume during dinner?",
        answers: [
            {text: "Victory Coffee with saccharine", response: "coffee"},
            {text: "Boiled cabbage", response: "cabbage"},
            {text: "Victory Gin!", response: "gin"},
            {text: "The positivity of the Party & others", response: "starving"},
        ]
    }, 
    {
        questions: "Which channel is your favourite?",
        answers: [
            {text: "The news", response: "news"},
            {text: "The exercise channel", response: "exercise"},
            {text: "Two Minutes Hate", response: "hate"},
            {text: "All of them are my favourite!", response: "all"},
        ]
    },
    {
        questions: "Which of these is your favourite community activity?",
        answers: [
            {text: "Attending lectures and demonstrations", response: "lecture"},
            {text: "Assisting the Jr. Anti-Sex League", response: "league"},
            {text: "Preparing banners for Hate Week", response: "banner"},
            {text: "Manufacturing bombs in munitions", response: "munition"},
        ]
    },
    {
        questions: "What is your opinion on the war with Eastasia?",
        answers: [
            {text: "It's Awful!", response: "awful", wrong: true},
            {text: "We're going to win!", response: "win"},
            {text: "Eastasia will win", response: "enemywin", wrong: true},
            {text: "It's a pointless war", response: "pointless", wrong: true},
        ]
    },
    {
        questions: "If the party said the sky was red & the clouds were black, what color is the sky?",
        answers: [
            {text: "Red", response: "redsky"},
            {text: "Blue", response: "bluesky", wrong: true},
            {text: "I would have to verify", response: "verify", wrong: true},
            {text: "Green", response: "greensky", wrong: true},
        ]
    }
];

let questionEl = document.getElementById("question");
let answerBtns = document.getElementById("answer-buttons");
let nextBtn = document.getElementById("next-btn");
let subTextEl = document.getElementById("sub-text");
let bigBroImg = document.getElementById("bigBro");
let thumbImg = document.getElementById("thumb");
let countEl = document.getElementById("count");

let currentQuestionIndex = 0;
let wrongCount = 0;
let questionNum = 1;

// Count
countEl.innerHTML = 'Count: ' + wrongCount;


// Eyeball Function
document.querySelector('body').addEventListener('mousemove', eyeball);

function eyeball() {
    let eye = document.querySelectorAll('.eye');
    eye.forEach(function(eye){
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);

        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotation = (radian * (180/Math.PI) * -1) + 270; 
        eye.style.transform = "rotate("+ rotation + "deg)";
        })
}

function startQuiz () {
    bigBroImg.style.display = "none";
    thumbImg.style.display = "none";
    subTextEl.innerHTML = "Welcome to the annual Ingsoc Personality Quiz: 1984 Edition! Answer the following questions and find your personality type! There are no wrong answers. Please choose the right answers or the count will go up. Do not let it reach 3.";
    wrongCount = 0;
    questionNum = 1;
    currentQuestionIndex = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    if (currentQuestionIndex < questions.length) {
    questionEl.innerHTML = questionNum + '.' + currentQuestion.questions;
    }
    currentQuestion.answers.forEach(answer => {
        let btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtns.appendChild(btn);
        if (answer.wrong) {
            btn.dataset.wrong = answer.wrong;
        }
        if (answer.response) {
            btn.dataset.response = answer.response;
        }

        btn.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let response = selectedBtn.dataset.response;
    let ifWrong = selectedBtn.dataset.wrong == "true";
    if (ifWrong) {
        wrongCount++;
        countEl.innerHTML = 'Count: ' + wrongCount;
        console.log(wrongCount);
        selectedBtn.classList.add("wrong");
        setTimeout(() => { selectedBtn.classList.remove("wrong"); }, 500);
        // Wrong warnings
        if (response == "read") {
            subTextEl.innerHTML = "One of the worst things for a Party member to do is gain misleading knowledge.";
        } else if (response == "awful") {
            subTextEl.innerHTML = "The war effort is one of the most, if the not the most important goal of all of Oceania. War is peace.";
        } else if (response == "enemywin") {
            subTextEl.innerHTML = "The enemy will NEVER win.";
        } else if (response == "pointless") {
            subTextEl.innerHTML = "Cynicism will not help when the capitalists take over.";
        } else if (response == "bluesky") {
            subTextEl.innerHTML = "Resistance to the Party's truths only ends in embarassment.";
        } else if (response == "verify") {
            subTextEl.innerHTML = "There is no need to verify a truth, even if it's wrong.";
        } else if (response == "greensky") {
            subTextEl.innerHTML = "????";
        }
        
        // Game over
        if (wrongCount == 3) {
            currentQuestionIndex = questions.length;
            subTextEl.innerHTML = "";
            questionEl.innerHTML = "You are an Enemy of the State!";
            bigBroImg.style.display = "block";
            resetState();
            playAgain();
        }
 
        Array.from(answerBtns.children).forEach(button => {
        setTimeout(() => {button.disabled = false;}, 1500)
        }) 
    } else {
        selectedBtn.classList.add("ok");
        questionNum++;
        // Ok Responses
        if (response == "red") {
            subTextEl.innerHTML = "Red is a color that represents passion & sacrifice. Both of these qualities are invaluable to the Party.";
        } else if (response == "green") {
            subTextEl.innerHTML = "A humble comrade will know that there's always room to grow, much like greenery.";
        } else if (response == "blue") {
            subTextEl.innerHTML = "The serenity of the oceans are often associated with the color blue. A calm worker is an efficient one.";
        } else if (response == "yellow") {
            subTextEl.innerHTML = "Your radiate positivity like the sun. You are always there for your comrades.";
        } else if (response == "dog") {
            subTextEl.innerHTML = "It is clear that you value the immovable loyalty of dogs.";
        } else if (response == "cat") {
            subTextEl.innerHTML = "Your amiability towards cats shows that you're willing, or even pleased to share with others.";
        } else if (response == "rabbit") {
            subTextEl.innerHTML = "Rabbits constantly clean themselves. It's easiest to represent the Party well when you smell good. They also make a good stew if rations are ever low (if ever).";
        } else if (response == "lizard") {
            subTextEl.innerHTML = "Shedding one's skin like a lizard for a new day at work is a very useful quality to have.";
        } else if (response == "dinner") {
            subTextEl.innerHTML = "It's important to stay fit & healthy to perform at your best!";
        } else if (response == "telescreen") {
            subTextEl.innerHTML = "Although it may seem like a leisurely activity, viewing the telescreen is one of the most important duties of a party member."
            currentQuestionIndex++;
        } else if (response == "community") {
            subTextEl.innerHTML = "Participating in community events assists in emboldening one's patriotism."
            currentQuestionIndex += 2;
        }  else if (response == "coffee") {
            subTextEl.innerHTML = "Victory coffee helps keep you energetic! Even during the evening.";
            currentQuestionIndex += 2;
        } else if (response == "cabbage") {
            subTextEl.innerHTML = "A healthy dinner makes you energetic and productive in the morning.";
            currentQuestionIndex += 2;
        } else if (response == "gin") {
            subTextEl.innerHTML = "Best to keep your emotions suppressed for the Party. Human emotion is disloyalty.";
            currentQuestionIndex += 2;
        } else if (response == "starving") {
            subTextEl.innerHTML = "On days where rations are low, it's great that people like you realize that camradery is nourishment enough.";
            currentQuestionIndex += 2;;
        } else if (response == "news") {
            subTextEl.innerHTML = "You are informed with the undeniable truths of the Party.";
            currentQuestionIndex++;
        } else if (response == "exercise") {
            subTextEl.innerHTML = "Being fit must help with your focus at work.";
            currentQuestionIndex++;
        } else if (response == "hate") {
            subTextEl.innerHTML = "A healthy way to find an outlet for your anger!";
            currentQuestionIndex++;
        } else if (response == "all") {
            subTextEl.innerHTML = "This shows that you are loyal to the party's messages.";
            currentQuestionIndex++;
        } else if (response == "lecture") {
            subTextEl.innerHTML = "An attentive learner of the Party doctrine is important to your mind trained.";
        } else if (response == "league") {
            subTextEl.innerHTML = "An attitude maintained against sex is a good attitude."
        } else if (response == "banner") {
            subTextEl.innerHTML = "A lively member will maintain the spirit of Hate Week."
        } else if (response == "munition") {
            subTextEl.innerHTML = "Assisting in the war effort shows one's willingness in helping achieve the ultimate goal."
        } else if (response == "win") {
            subTextEl.innerHTML = "That's right! We will win! There will emerge victorious over Eurasia!"
        } else if (response == "redsky") {
            subTextEl.innerHTML = "Obedience to the Party's truths is a quality maintained in the most prestigious Inner Party members."
        } 
        nextBtn.style.display = "block";
     } 
    Array.from(answerBtns.children).forEach(button => {
        button.disabled = true;
    });
}

function playAgain() {
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    resetState();
    currentQuestionIndex++;
    subTextEl.innerHTML = "";
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        playAgain();
        questionEl.innerHTML = "";
        if (questionNum == questions.length - 1) {
            questionEl.innerHTML = "Congratulations! You are a: Loyal Comrade";
            thumbImg.style.display = "block";
        } 
    }
}


nextBtn.addEventListener('click', ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});


startQuiz();
