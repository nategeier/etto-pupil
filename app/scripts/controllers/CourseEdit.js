"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course", "CoursePlayer", "$rootScope",
    function ($scope, course, CoursePlayer, $rootScope) {
      $scope.course = course;

      $scope.isEditing = true;

      $scope.statuses = ["live", "testing", "private"];

      var socket = io($rootScope.config.socketUrl);

      socket.on("course updated: " + $scope.course._id, function (data) {

        $scope.$apply(function () {
          $scope.course.blocks = data.blocks;
          $scope.course.title = data.title;
          $scope.course.subtitle = data.subtitle;
          $scope.course.status = data.status;
          $scope.course.thumb = data.thumb;
          $scope.course.meta = data.meta;

          var newCurrentBlock = Number(CoursePlayer.currentBlock());
          //--- Check the changed block is befor the editors current block, 
          //--- Change the users current block if a block was added, deleated or witched
          if (data.eventType && data.blockChanged <= CoursePlayer.currentBlock() && CoursePlayer.currentBlock() >= 1) {
            //--- Event typye 1 = added, -1, slide deleated, null = blocks swapped
            newCurrentBlock = Number(CoursePlayer.currentBlock()) + data.eventType;
          }

          //--Blockes were swapped
          if (!data.eventType) {
            if (data.blockChanged === Number(CoursePlayer.currentBlock()) - 1) {
              newCurrentBlock = Number(CoursePlayer.currentBlock()) - 1;
            }

            if (data.blockChanged === Number(CoursePlayer.currentBlock())) {
              newCurrentBlock = Number(CoursePlayer.currentBlock()) + 1;
            }
          }

          CoursePlayer.play($scope.course, newCurrentBlock);
          $scope.course.$update();
          //CoursePlayer.lastEvent(0);

        });
      });

      $scope.$on("course-save", function () {
        // TODO: Validate course before update

        var emmitedCourse = $scope.course;

        emmitedCourse.eventType = CoursePlayer.eventType();
        emmitedCourse.blockChanged = CoursePlayer.currentBlock();

        console.log(CoursePlayer.currentBlock());

        socket.emit("updated course", emmitedCourse);

        $scope.course.$update();

        CoursePlayer.lastEvent(0);
        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

    }
  ]);
