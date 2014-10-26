"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course", "CoursePlayer",
    function ($scope, course, CoursePlayer) {
      $scope.course = course;

      $scope.isEditing = true;

      $scope.statuses = ["live", "testing", "private"];

      var socket = io("https://api.coursetto.com");

      socket.on("course updated: " + $scope.course._id, function (data) {

        console.log("EMIT UPDATE COURSE", data.title);

        $scope.$apply(function () {
          $scope.course = data;
          console.log("current cloc", CoursePlayer.currentBlock());
          CoursePlayer.play($scope.course, Number(CoursePlayer.currentBlock()));
        });
      });

      $scope.$on("course-save", function () {
        // TODO: Validate course before update

        console.log("updated0000------");

        socket.emit("updated course", $scope.course);

        $scope.course.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

    }
  ]);
