const readline = require('readline');
const fs = require('fs');
const { EOL } = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readFile() {
  const arrOfObj = [];
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

function chooseCategory() {
  console.log('Категории вопросов:');
  console.log('1. Еда');
  console.log('2. Эльбрус');
  console.log('3. Смешное(очень)');
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

function printResultIcon(correct) {
  if (correct) {
    console.log('✅ Верно! ✅');
  } else {
    console.log('❌ Неверно! ❌');
  }
}

function startQuiz(category) {
  const filteredQuestions = files.filter(
    (q) => q.category === category
  );
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  function askQuestion() {
    if (currentQuestionIndex < filteredQuestions.length) {
      const currentQuestion = filteredQuestions[currentQuestionIndex].question;
      console.log('=================================================================================================');
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
      console.log('=================================================================================================');
      console.log(`Результат: ${correctAnswers}/${totalQuestions}`);
      console.log('=================================================================================================');
      rl.close();
    }
  }
  askQuestion();
}

chooseCategory();
