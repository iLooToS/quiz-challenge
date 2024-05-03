const readline = require("readline");
const questionsAndAnswers = require("./QandA");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class Model {
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
}
module.exports = Model