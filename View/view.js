const readline = require('readline');
// const questionsAndAnswers = require("./QandA");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  chooseCategory() {
    console.log('Категории вопросов:');
    console.log('1. Eat');
    console.log('2. Elbrus');
    console.log('3. Musik');
    rl.question('Выберите категорию вопросов (введите номер): ', (category) => {
      if (category >= 1 && category <= 3) {
        startQuiz(parseInt(category));
      } else {
        console.log('Упс, ошибочка... Пожалуйста, введите число от 1 до 3.');
        chooseCategory();
      }
    });
  }

  // View
  static printResultIcon(correct) {
    if (correct) {
      console.log('🎆 Верно! Ты молодец!');
    } else {
      console.log('🤯 Неверно!');
    }
  }
}
// console.log("🤯 Неверно!");
// console.log("🎆 Верно! Ты молодец!")
