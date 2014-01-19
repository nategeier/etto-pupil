"use strict";

angular.module("ettoPupil")
  .directive("ettoAddCourse", [

    function() {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='addCourse()'>Add Course</a>",
        restrict: "AE",
        controller: function($scope, $modal, CourseMetaChange) {
          $scope.addCourse = function() {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddCourseModal.html",
              controller: function($scope, $modalInstance) {
                $scope.course = {};
                $scope.handleLogin = function() {
                  $modalInstance.close($scope.course);
                };
              }
            });
            modal.result.then(function(course) {

              course._creators = [$scope.user._id];

              CourseMetaChange.create(course, function(data) {

                if (data) {
                  $scope.listUsersCreatedCourses();
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