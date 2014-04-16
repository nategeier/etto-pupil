"use strict";

angular.module("ettoPupil")
  .directive("ettoCourseStatus", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange) {
          $scope.changeStatus = function () {

            var course = $scope.course;

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoCourseStatusModal.html",
              controller: function ($scope, $modalInstance, $location) {

                $scope.course = course;
                $scope.saveSettings = function () {
                  $modalInstance.close(true);
                };

                $scope.cancel = function () {
                  $modalInstance.close(false);
                };
              }
            });
            modal.result.then(function (didRemove) {
              if (didRemove) {
                $scope.saveCourse();
              }
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
