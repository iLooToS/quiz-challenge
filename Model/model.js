
const readline = require("readline");
const questionsAndAnswers = require("./QandA");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");
const { EOL } = require("os");
const path = require("path");

class Model {
  readFile() {
    const arrOfObj = [];
    const pathToDir = path.join(__dirname, "..", "topics");
    const folder = fs.readdirSync(pathToDir);

    for (let i = 0; i < folder.length; i += 1) {
      let count = 0;
      const pathToFile = `${pathToDir}/${folder[i]}`;
      const category = fs.readFileSync(pathToFile, "utf-8").trim();
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
  askQuestion() {
    if (currentQuestionIndex < filteredQuestions.length) {
      const currentQuestion = filteredQuestions[currentQuestionIndex].question;
      console.log('=============================================');
      console.log(`Вопрос:\r\n`, `${currentQuestion}\r\n`);

      rl.question(`Введите ответ: \r\n`, (answer) => {
        const correctAnswer = filteredQuestions[currentQuestionIndex].answer;

        const correct =
          answer.trim().toLowerCase() === correctAnswer.toLowerCase();
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
module.exports = Model

