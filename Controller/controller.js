// <<<<<<< fix_classModel
const Model = require("../Model/model");
const View = require("../View/view");

class Controller {
  static async runQuiz() {
    let counter = 0;
    const userCategory = await View.startQuiz();
    console.log(`Вы выбрали категорию "${userCategory.category}"`);
    let arrOfObjs;
    console.log(userCategory.category, "CATEGORY");

    if (userCategory.category === "Смешное") {
      arrOfObjs = await Model.getQuestionsAndAnswers("funny.txt");
    }
    if (userCategory.category === "Еда") {
      arrOfObjs = await Model.getQuestionsAndAnswers("eat.txt");
    }
    if (userCategory.category === "Эльбрус") {
      arrOfObjs = await Model.getQuestionsAndAnswers("ElbrusFriends.txt");
    }
    for (const question of arrOfObjs) {
      counter = await View.pullQuestions(question, counter);
    }
    console.log(
      `Поздравляем, ты выиграл ${counter} очков в категории: ${userCategory.category}`
    );
// =======
// const Model = require('../Model/model');
// const View = require('../View/view');
// // const readline = require('readline');
// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// // });

// class Controller {
//   // #model;

//   // #view;

//   constructor() {
//     this.model = new Model();
//     this.view = new View();
//   }

//   startQuiz(category) {
//     const model = new Model();
//     const filteredQuestions = model.readFile().filter(
//       (q) => q.category === category
//     );
//     const currentQuestionIndex = 0;
//     const correctAnswers = 0;

//     function askQuestion() {
//       if (currentQuestionIndex < filteredQuestions.length) {
//         const currentQuestion = filteredQuestions[currentQuestionIndex].question;
//         console.log('=============================================');
//         console.log('Вопрос:\r\n', `${currentQuestion}\r\n`);

//         rl.question('Введите ответ: \r\n', (answer) => {
//           const correctAnswer = filteredQuestions[currentQuestionIndex].answer;

//           const correct = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
//           View.printResultIcon(correct);

//           if (correct) {
//             correctAnswers++;
//           }

//           currentQuestionIndex++;

//           askQuestion();
//         });
//       } else {
//         const totalQuestions = filteredQuestions.length;
//         console.log(`Результат: ${correctAnswers}/${totalQuestions}`);

//         rl.close();
//       }
//     }
// >>>>>>> development
  }
}
// const result = await Model.getQuestionsAndAnswers('eat.txt');
// console.log(result);
Controller.runQuiz();
module.exports = Controller;
