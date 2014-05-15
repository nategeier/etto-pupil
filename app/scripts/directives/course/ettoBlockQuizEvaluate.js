"use strict";

angular.module("ettoPupil")
  .directive("ettoBlockQuizEvaluate", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, $document, $attrs, BlockQuiz) {

          var incorrectQuestions = [];

          $scope.alphabet = BlockQuiz.alphabet;

          var correctNum = 0;

          $scope.checkAnswer = function (answers, answer, index) {

            for (var i = 0; i < answers.length; i++) {
              if (answer === answers[i]) {
                answers[i].selected = true;
              } else {
                answers[i].selected = false;
              }
            }

            var id = "#question" + index;
            var qIndex = _.indexOf(incorrectQuestions, id);

            if (answer.correct === false) {
              if (qIndex === -1) {
                incorrectQuestions.push(id);
              }
            } else {
              correctNum++;
              if (qIndex !== -1) {
                $(incorrectQuestions[qIndex]).removeClass("incorrect");
                incorrectQuestions.splice(qIndex, 1);
              }
            }
          };

          $scope.evaluate = function () {

            for (var i = 0; i < incorrectQuestions.length; i++) {
              $(incorrectQuestions[i]).addClass("incorrect");
            }
            if (!incorrectQuestions[0] && correctNum >= $(".question").length) {
              $scope.nextBlock();
            }

          };
        },

        link: function postLink(scope, element, attrs) {

        }

      };
    }
  ]);
