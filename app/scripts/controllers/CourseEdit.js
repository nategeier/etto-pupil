"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course", "CoursePlayer",
    function ($scope, course, CoursePlayer) {
      $scope.course = course;

      $scope.isEditing = true;

      $scope.statuses = ["live", "testing", "private"];

      var socket = io("https://api.coursetto.com");
      //var socket = io("http://localhost:4220");

      socket.on("course updated: " + $scope.course._id, function (data) {

        $scope.$apply(function () {
          $scope.course = data;
          CoursePlayer.play($scope.course, Number(CoursePlayer.currentBlock()));
        });
      });

      $scope.$on("course-save", function () {
        // TODO: Validate course before update

        socket.emit("updated course", $scope.course);

        $scope.course.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

    }
  ]);
