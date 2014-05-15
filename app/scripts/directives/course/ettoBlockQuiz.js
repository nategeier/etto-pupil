"use strict";

angular.module("ettoPupil")
  .directive("ettoBlockQuiz", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, $document, $attrs, BlockQuiz) {

          var incorrectQuestions = [];
          var totalQuestions = 0;

          $scope.alphabet = BlockQuiz.alphabet;

          $scope.addAnswer = function (questions, index) {
            questions[index].answers.push(BlockQuiz.getQuestion().answers[0]);
          };

          $scope.addQuestion = function (questions) {
            questions.push(BlockQuiz.getQuestion());
          };

          $scope.deleteAnswer = function (answers, index) {
            BlockQuiz.deleteAnswer(answers, index);
          };

          $scope.deleteQuestion = function (questions, index) {
            BlockQuiz.deleteQuestion(questions, index);
          };
        },

        link: function postLink(scope, element, attrs) {}

      };
    }
  ]);
