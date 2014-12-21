"use strict";

/**
 * BlockQuiz Service
 * ============================================================================
 *
 * Creates AngularJS service "BlockQuiz".
 *
 */

angular.module("ettoPupil")
  .factory("BlockQuiz", [

    function () {

      var alphabet = ["a", "b", "c", "d", "e", "f", "g", "z"];

      /**
       * Get initial default question
       */

      var getQuestion = function () {

        var question = {
          question: "Question",
          incorrect: true,
          answers: [{
            answer: "Answer",
            correct: false
          }]
        };
        return question;
      };

      /**
       * Add Answer
       */

      var totalAnswers = function (answers) {
        return answers.length;
      };

      /**
       * Add Answer
       */

      var totalQuestions = function (questions) {
        return questions.length;
      };

      /**
       * Add Question
       */

      var addQuestion = function (questions) {
        questions.push(getQuestion());
        return totalQuestions(questions);
      };

      /**
       * Delete entire question
       */

      var deleteQuestion = function (questions, index) {
        questions.splice(index, 1);
        return totalQuestions(questions);
      };

      /**
       * Add Answer
       */

      var addAnswer = function (questions, index) {
        questions[index].answers.push(getQuestion().answers[0]);
        return totalAnswers(questions[index].answers);
      };

      /**
       * Delete the Answer
       */

      var deleteAnswer = function (answers, index) {
        answers.splice(index, 1);
        return answers.length;
      };

      /**
       * CheckAnswer
       */

      var checkAnswer = function (answers, answer, index, evaluations) {
        for (var i = 0; i < answers.length; i++) {
          if (answer === answers[i]) {
            answers[i].selected = true;
          } else {
            answers[i].selected = false;
          }
        }
        evaluations[index] = answer.correct;
      };

      /**
       * Evaluate quiz
       */

      var evaluate = function (evaluations, questions, done) {
        var passed = true;
        var index = 0;
        async.mapSeries(evaluations, function (evaluate, done) {
          questions[index].incorrect = !evaluate;
          if (evaluate === false) {
            passed = false;
            questions[index].incorrect = true;
          }
          index++;
          done();
        }, function () {
          done(passed);
        });
      };

      var BlockQuiz = {
        totalAnswers: totalAnswers,
        totalQuestions: totalQuestions,
        addAnswer: addAnswer,
        addQuestion: addQuestion,
        getQuestion: getQuestion,
        alphabet: alphabet,
        deleteAnswer: deleteAnswer,
        checkAnswer: checkAnswer,
        evaluate: evaluate,
        deleteQuestion: deleteQuestion
      };

      return BlockQuiz;
    }
  ]);
