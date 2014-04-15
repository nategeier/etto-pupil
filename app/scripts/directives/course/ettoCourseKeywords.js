"use strict";

angular.module("ettoPupil")
  .directive("ettoCourseKeywords", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, $document, $attrs, BlockQuiz) {
          // Are we in edit mode?
          //$scope.editing = $attrs.edit !== undefined;
          var incorrectQuestions = [];

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

          $scope.checkAnswer = function (correct, index) {

            var id = "#question" + index;
            var qIndex = _.indexOf(incorrectQuestions, id);

            if (correct === false) {
              if (qIndex === -1) {
                incorrectQuestions.push(id);
              }
            } else {
              if (qIndex !== -1) {
                $(incorrectQuestions[qIndex]).removeClass("incorrect");
                incorrectQuestions.splice(qIndex, 1);
              }
            }
          };

          $scope.evaluate = function (questions, index) {
            for (var i = 0; i < incorrectQuestions.length; i++) {
              $(incorrectQuestions[i]).addClass("incorrect");
            }
            if (!incorrectQuestions[0]) {
              $scope.nextBlock();
            }

          };
        },

        link: function postLink(scope, element, attrs) {}

      };
    }
  ]);
