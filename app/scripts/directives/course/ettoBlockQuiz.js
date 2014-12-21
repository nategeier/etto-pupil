"use strict";

angular.module("ettoPupil")
  .directive("ettoBlockQuiz", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, $document, $attrs, BlockQuiz, CoursePlayer) {

          var evaluations = [];
          var scoreToPass = 0;

          $scope.alphabet = BlockQuiz.alphabet;

          $scope.addAnswer = function (questions, index) {
            BlockQuiz.addAnswer(questions, index);
          };

          $scope.addQuestion = function (questions) {
            BlockQuiz.addQuestion(questions);
          };

          $scope.deleteAnswer = function (answers, index) {
            BlockQuiz.deleteAnswer(answers, index);
          };

          $scope.deleteQuestion = function (questions, index) {
            BlockQuiz.deleteQuestion(questions, index);
          };

          $scope.setUpEvalArr = function (questions) {
            if (questions.passed && questions.passed === true) {
              //---- Passed
            } else {
              $scope.lock();
              $scope.lockedBlock = true;
              async.map(questions, function (question) {
                question.didPass = false;
                evaluations.push(false);
              });
            }
          };

          $scope.scoreToPass = function (passable) {
            scoreToPass = passable;
          };

          $scope.checkAnswer = function (answers, answer, index) {
            BlockQuiz.checkAnswer(answers, answer, index, evaluations);
          };

          $scope.evaluate = function (questions) {
            BlockQuiz.evaluate(evaluations, questions, function (passed) {
              if (passed === false) {
                $scope.err = {};
                $scope.err.message = "Looks like you have some incorrect or incomplete answers.";
              } else {
                $scope.err = null;
                $scope.unlock();
                $scope.nextBlock();
              }
              questions.passed = passed;
            });
          };
        },

        link: function postLink(scope, element, attrs) {}

      };
    }
  ]);
