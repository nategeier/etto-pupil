"use strict";

angular.module("ettoPupil")
  .directive("ettoBlockQuiz", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, $document, $attrs, BlockQuiz, CoursePlayer) {

          var evaluations = [];
          var scoreToPass = 0;
          //$scope.lockedBlock = true;

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

          $scope.setUpEvalArr = function (questions) {
            if (questions.passed && questions.passed === true) {

            } else {
              $scope.lock();

              $scope.lockedBlock = true;

              async.map(questions, function (question) {
                evaluations.push(false);
              });
            }
          };

          $scope.scoreToPass = function (passable) {
            scoreToPass = passable;
          };

          $scope.checkAnswer = function (answers, answer, index) {
            for (var i = 0; i < answers.length; i++) {
              if (answer === answers[i]) {
                answers[i].selected = true;
              } else {
                answers[i].selected = false;
              }
            }
            evaluations[index] = answer.correct;
          };

          $scope.evaluate = function (questions) {
            var passed = true;
            var index = 0;

            async.mapSeries(evaluations, function (evaluate, done) {

              if (evaluate === false) {
                passed = false;
                questions[index].incorrect = true;
              } else {
                questions[index].incorrect = false;
              }

              index++;
              done(null);
            }, function (err) {

              if (passed === false) {
                $scope.err = {};
                $scope.err.message = "Looks like you have some incorrect or incomplete answers.";
                questions.passed = false;
              } else {
                $scope.err = null;
                questions.passed = true;
                $scope.unlock();
                $scope.nextBlock();

              }
            });
          };
        },

        link: function postLink(scope, element, attrs) {}

      };
    }
  ]);
