"use strict";

angular.module("ettoPupil")
  .directive("ettoAddCourse", [

    function () {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='addCourse()'><i class='fa fa-pencil'></i> Create Course</a>",
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange) {
          $scope.addCourse = function () {

            var user = $scope.user;

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddCourseModal.html",
              controller: function ($scope, $modalInstance, Payment, $location) {

                $scope.user = user;

                if ($scope.createdCourses && $scope.createdCourses.length > 1) {
                  Payment.checkCanAddCourse(user._tier._company, function (result) {
                    $scope.subscriptionGood = result.isGood;
                  });
                } else {
                  $scope.subscriptionGood = true;
                }

                $scope.course = {};
                $scope.handleLogin = function () {
                  $modalInstance.close($scope.course);
                };

                $scope.linkSubscription = function () {

                  $modalInstance.close();
                  $location.path("/subscription/" + user._id);
                };

              }
            });
            modal.result.then(function (course) {

              course._creator = $scope.user._tier._company;

              CourseMetaChange.create(course, function (data) {

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
