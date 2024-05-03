class Controller {
  startQuiz(category) {
    const filteredQuestions = questionsAndAnswers.filter(
      (q) => q.category === category
    );
    const currentQuestionIndex = 0;
    const correctAnswers = 0;
  }
}

module.exports = Controller;
