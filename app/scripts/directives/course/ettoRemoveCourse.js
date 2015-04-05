"use strict";

angular.module("ettoPupil")
  .directive("ettoRemoveCourse", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange) {
          $scope.removeCourse = function (id, title) {

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoRemoveCourseModal.html",
              controller: function ($scope, $modalInstance, Payment, $location) {

                $scope.courseTitle = title;
                $scope.isSureRemove = function () {
                  $modalInstance.close(true);
                };

                $scope.cancel = function () {
                  $modalInstance.close(false);
                };

              }
            });
            modal.result.then(function (didRemove) {

              var course = {
                id: id
              };

              if (didRemove) {
                CourseMetaChange.removeCourse(course, function (data) {
                  $scope.reset();
                });
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
