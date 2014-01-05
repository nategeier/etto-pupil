"use strict";

angular.module("ettoPupil")
  .directive("ettoAddCourse", [

    function () {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='addCourse()'>Add Course</a>",
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange, $location) {
          $scope.addCourse = function () {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddCourseModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.course = {};
                $scope.handleLogin = function () {
                  $modalInstance.close($scope.course);
                };
              }
            });
            modal.result.then(function (course) {

              console.log($scope.user._id);
              course._creators = [$scope.user._id];

              CourseMetaChange.create(course, function (data) {

                if (data.results) {
                  $scope.listUsersCreatedCourses();
                  //$location.path($scope.redirectTo);
                }
              });
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
