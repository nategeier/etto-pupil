"use strict";

angular.module("ettoPupil")
  .controller("CourseEditCtrl", ["$scope", "course",
    function ($scope, course) {
      $scope.course = course;

      $scope.$on("course-save", function () {
        // TODO: Validate course before update
        $scope.course.$update();

        // Clear out the Toolbox
        // TODO: Understand why saving relinks Blocks
        angular.element(".etto-toolbox-blocktools").empty();
      });

      /*
      $scope.showContentents = function () {
        console.log('wtf', editor.getElement("previewer").body.innerHTML);
        $scope.boogy = editor.getElement("previewer").body.innerHTML;
        //console.log(editor.getElement("editor").body.innerHTML); // Returns the editor's content
      };

      editor.emit("update", function () {
        $scope.boogy = editor.getElement("previewer").body.innerHTML;
        console.log('Editor was removed', $scope.boogy);
      });
      */

    }
  ]);
