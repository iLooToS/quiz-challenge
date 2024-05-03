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
  }
}
// const result = await Model.getQuestionsAndAnswers('eat.txt');
// console.log(result);
Controller.runQuiz();
module.exports = Controller;
