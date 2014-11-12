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
          var newCurrentBlock = Number(CoursePlayer.currentBlock());

          if (data.blockedChanged <= CoursePlayer.currentBlock() && CoursePlayer.currentBlock() >= 1) {
            newCurrentBlock = Number(CoursePlayer.currentBlock()) + data.eventType;
          }

          CoursePlayer.play($scope.course, newCurrentBlock);
          CoursePlayer.lastEvent(0);

        });
      });

      $scope.$on("course-save", function () {
        // TODO: Validate course before update

        var emmitedCourse = $scope.course;

        emmitedCourse.eventType = CoursePlayer.eventType();
        emmitedCourse.blockedChanged = CoursePlayer.currentBlock();
        socket.emit("updated course", emmitedCourse);

        $scope.course.$update();

        CoursePlayer.lastEvent(0);
        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

    }
  ]);
