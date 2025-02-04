const quizQuestionElement = document.getElementById('quizQuestion');
const quizOptionsElement = document.getElementById('quizOptions');
const submitAnswerButton = document.getElementById('submitAnswer');
const quizScoreElement = document.getElementById('quizScore');

let currentQuizIndex = 0;
let totalScore = 0;
let quizQuestions = [];
let chosenOption = null;

async function loadQuizQuestions() {
  const response = await fetch('/questions');
  const quizData = await response.json();
  return quizData;
}

function renderQuizQuestion(questionObj) {
  quizQuestionElement.textContent = questionObj.question;
  quizOptionsElement.innerHTML = '';
  chosenOption = null;

  questionObj.options.forEach((optionText) => {
    const optionButton = document.createElement('button');
    optionButton.textContent = optionText;
    optionButton.addEventListener('click', () => selectQuizOption(optionButton, optionText));
    quizOptionsElement.appendChild(optionButton);
  });
}

function selectQuizOption(button, optionText) {
  const optionButtons = quizOptionsElement.querySelectorAll('button');
  optionButtons.forEach((btn) => btn.classList.remove('selected'));

  button.classList.add('selected');
  chosenOption = optionText;
}

function handleQuizSubmission() {
  if (!chosenOption) {
    alert('Please select an option before submitting!');
    return;
  }

  const currentQuestion = quizQuestions[currentQuizIndex];
  if (chosenOption === currentQuestion.answer) {
    totalScore++;
    alert('Correct!');
  } else {
    alert(`Incorrect! The correct answer was: ${currentQuestion.answer}`);
  }

  currentQuizIndex++;

  if (currentQuizIndex < quizQuestions.length) {
    renderQuizQuestion(quizQuestions[currentQuizIndex]);
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  quizQuestionElement.textContent = 'Quiz Over!';
  quizOptionsElement.innerHTML = '';
  submitAnswerButton.style.display = 'none';
  quizScoreElement.textContent = `Your Score: ${totalScore}/${quizQuestions.length}`;
}

loadQuizQuestions().then((data) => {
  quizQuestions = data;
  if (quizQuestions.length > 0) {
    renderQuizQuestion(quizQuestions[currentQuizIndex]);
  } else {
    quizQuestionElement.textContent = 'No questions available!';
  }
});

submitAnswerButton.addEventListener('click', handleQuizSubmission);
