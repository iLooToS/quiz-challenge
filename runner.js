const readline = require('readline');
// const questionsAndAnswers = require('./QandA');
const fs = require('fs');
const { EOL } = require('os');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readFile() {
  const arrOfObj = [];
  const pathToDir = path.join(__dirname, '..', 'topics');
  const folder = fs.readdirSync('./topics');

  for (let i = 0; i < folder.length; i += 1) {
    let count = 0;
    const pathToFile = `${'./topics'}/${folder[i]}`;
    const category = fs.readFileSync(pathToFile, 'utf-8').trim();
    const categoryArr = category.split(EOL);
    for (let j = 0; j < categoryArr.length - 1; j += 1) {
      const obj = {};
      if (categoryArr[count]) {
        obj.category = i + 1;
        obj.question = categoryArr[count];
        count += 1;
        obj.answer = categoryArr[count];
        count += 1;
        arrOfObj.push(obj);
      }
    }
  }
  return arrOfObj;
}


const files = readFile();

console.log(files);
// View
function chooseCategory() {
  console.log('Категории вопросов:');
  console.log('1. Категория 1');
  console.log('2. Категория 2');
  console.log('3. Категория 3');
  rl.question('Выберите категорию вопросов (введите номер): ', (category) => {
    if (category >= 1 && category <= 3) {
      startQuiz(parseInt(category));
    } else {
      console.log(
        'Неверный выбор категории. Пожалуйста, введите число от 1 до 3.'
      );
      chooseCategory();
    }
  });
}

// View
function printResultIcon(correct) {
  if (correct) {
    console.log('✅ Верно!');
  } else {
    console.log('❌ Неверно!');
  }
}

// Controller
function startQuiz(category) {
  const filteredQuestions = files.filter(
    (q) => q.category === category
  );
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  // Model
  function askQuestion() {
    if (currentQuestionIndex < filteredQuestions.length) {
      const currentQuestion = filteredQuestions[currentQuestionIndex].question;
      console.log('Вопрос:', currentQuestion);
      rl.question('Введите ответ: ', (answer) => {
        const correctAnswer = filteredQuestions[currentQuestionIndex].answer;
        const correct = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
        printResultIcon(correct);
        if (correct) {
          correctAnswers++;
        }
        currentQuestionIndex++;
        askQuestion();
      });
    } else {
      const totalQuestions = filteredQuestions.length;
      console.log(`Результат: ${correctAnswers}/${totalQuestions}`);
      rl.close();
    }
  }
  askQuestion();
}

chooseCategory();
