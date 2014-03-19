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

      var getQuestion = function () {

        var question = {
          question: "Question",
          answers: [{
            answer: "Answer",
            correct: false
          }]
        };
        return question;
      };

      var deleteAnswer = function (answers, index) {
        answers.splice(index, 1);
      };

      var deleteQuestion = function (questions, index) {
        questions.splice(index, 1);
      };

      var BlockQuiz = {
        getQuestion: getQuestion,
        alphabet: alphabet,
        deleteAnswer: deleteAnswer,
        deleteQuestion: deleteQuestion
      };

      return BlockQuiz;
    }
  ]);
