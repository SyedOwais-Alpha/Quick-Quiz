const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin","Paris", "Madrid", "Rome"],
      correctAnswer: 1
    },
    {
      question: "What is the capital of Pakistan?",
      answers: ["Karachi", "Lahore", "Islamabad", "Multan"],
      correctAnswer: 2
    },
    {
      question: "What is the capital of America?",
      answers: ["Washington D.C.", "San Fransisco", "Seattle", "New York"],
      correctAnswer: 0
    },
    // Add more questions here
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionContainer = document.getElementById('question-container');
  const questionEl = document.getElementById('question');
  const answerOptionsEl = document.getElementById('answer-options');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');
  const scoreEl = document.getElementById('score');
  const progressBar = document.querySelector('.progress');
  
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    
    answerOptionsEl.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <label>
          <input type="radio" name="answer" value="${index}">
          ${answer}
        </label>
      `;
      answerOptionsEl.appendChild(li);
    });
  
    resultEl.textContent = '';
    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';
  }
  
  function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
      resultEl.textContent = "Please select an answer.";
      return;
    }
  
    const isCorrect = parseInt(selectedAnswer.value) === questions[currentQuestionIndex].correctAnswer;
    resultEl.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    resultEl.classList.add(isCorrect ? 'correct' : 'incorrect');
  
    if (isCorrect) score++;
    scoreEl.textContent = score;
  
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
  
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= questions.length) {
      questionContainer.innerHTML = `<h2>Quiz Complete! Final Score: ${score}</h2>`;
    } else {
      displayQuestion();
    }
  }
  
  submitBtn.addEventListener('click', checkAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  
  // Initialize the quiz
  displayQuestion();
  
function loadScore() {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      score = parseInt(savedScore);
      scoreEl.textContent = score;
    }
  }
  
  function updateScore() {
    localStorage.setItem('score', score);
  }
  
  submitBtn.addEventListener('click', () => {
    checkAnswer();
    updateScore();
  });
  
  window.addEventListener('load', loadScore);
  