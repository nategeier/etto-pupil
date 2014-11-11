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

          if (data.blockedChanged < CoursePlayer.currentBlock()) {
            newCurrentBlock = Number(CoursePlayer.currentBlock()) + data.eventType;
          }

          CoursePlayer.play($scope.course, newCurrentBlock);

        });
      });

      $scope.$on("course-save", function () {
        // TODO: Validate course before update

        $scope.course.eventType = CoursePlayer.eventType();
        $scope.course.blockedChanged = CoursePlayer.currentBlock();

        socket.emit("updated course", $scope.course);

        $scope.course.$update();
        CoursePlayer.lastEvent(0);
        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

    }
  ]);
