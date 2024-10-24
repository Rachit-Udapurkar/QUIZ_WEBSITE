const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Markup Language",
            "Hyperlink and Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: [
            "<break>",
            "<br>",
            "<lb>"
        ],
        answer: "<br>"
    },
    {
        question: "What is the purpose of the `<title>` tag?",
        options: [
            "To define the title of the document",
            "To create headings",
            "To link external styles"
        ],
        answer: "To define the title of the document"
    },
    {
        question: "Which HTML element is used to define the structure of an HTML document?",
        options: [
            "<html>",
            "<head>",
            "<body>"
        ],
        answer: "<html>"
    },
    {
        question: "Which of the following is the correct way to create a hyperlink?",
        options: [
            "<a href='url'>Link</a>",
            "<link href='url'>Link</link>",
            "<hyperlink href='url'>Link</hyperlink>"
        ],
        answer: "<a href='url'>Link</a>"
    },
    {
        question: "What is the correct HTML for adding an image?",
        options: [
            "<img src='image.jpg' />",
            "<image src='image.jpg' />",
            "<img href='image.jpg' />"
        ],
        answer: "<img src='image.jpg' />"
    },
    {
        question: "Which tag is used to define an unordered list?",
        options: [
            "<ol>",
            "<ul>",
            "<li>"
        ],
        answer: "<ul>"
    },
    {
        question: "What is the correct HTML element for defining emphasized text?",
        options: [
            "<em>",
            "<italic>",
            "<strong>"
        ],
        answer: "<em>"
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        options: [
            "src",
            "alt",
            "title"
        ],
        answer: "alt"
    },
    {
        question: "What is the correct way to add a comment in HTML?",
        options: [
            "<!-- This is a comment -->",
            "// This is a comment",
            "' This is a comment"
        ],
        answer: "<!-- This is a comment -->"
    }
];

let currentQuestionIndex = 0;

function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    const item = quizData[currentQuestionIndex];
    const questionEl = document.createElement("div");
    questionEl.classList.add("question");
    questionEl.innerHTML = `<p>${currentQuestionIndex + 1}. ${item.question}</p>`;
    
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    item.options.forEach(option => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.innerText = option;
        optionEl.onclick = () => selectOption(option, item.answer, optionEl);
        optionsContainer.appendChild(optionEl);
    });

    questionEl.appendChild(optionsContainer);
    quizContainer.appendChild(questionEl);
}

function selectOption(selected, correct, element) {
    const options = element.parentNode.children;
    for (let option of options) {
        option.onclick = null; // Disable further clicks
        if (option.innerText === correct) {
            option.classList.add("correct");
        } else if (option.innerText === selected) {
            option.classList.add("incorrect");
        }
    }

    if (selected === correct) {
        score++;
    }

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(loadQuiz, 1000); // Load the next question after 1 second
    } else {
        document.getElementById("result").innerHTML = `You scored ${score} out of ${quizData.length}`;
        document.getElementById("submit").style.display = 'none'; // Hide submit button after quiz ends
    }
}

document.getElementById("submit").onclick = () => {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
};

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    if (sectionId === 'quiz') {
        loadQuiz();
        score = 0; // Reset score when starting the quiz
        currentQuestionIndex = 0; // Reset question index
        document.getElementById("result").innerHTML = ""; // Clear previous result
        document.getElementById("submit").style.display = 'block'; // Show submit button
    }
}

// Initialize by showing the home section
showSection('home');


