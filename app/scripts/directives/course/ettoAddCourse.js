"use strict";

angular.module("ettoPupil")
  .directive("ettoAddCourse", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange, $state) {
          $scope.addCourse = function () {

            var user = $scope.user;

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddCourseModal.html",
              controller: function ($scope, $modalInstance) {

                $scope.user = user;
                $scope.course = {};

                $scope.createCourse = function () {

                  $modalInstance.close($scope.course);
                };

              }
            });
            modal.result.then(function (course) {

              course._creator = $scope.user._tier._company;

              CourseMetaChange.create(course, function (data) {
                $state.go("editCourse", {
                  courseId: data._id
                });
              });
            });
          };
        }
      };
    }
  ]);
