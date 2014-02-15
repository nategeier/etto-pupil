"use strict";

angular.module("ettoPupil")
  .directive("ettoAddCredits", [

    function () {
      return {
        template: "<a class='btn btn-primary btn-sm top-logout-btn' href='#' ng-click='addCredits()'><i class='fa fa-plus-square-o'></i> Add Credits {{credit.credits}}</a>",
        restrict: "AE",
        controller: function ($scope, $modal, CourseMetaChange) {
          $scope.addCredits = function () {

            var credit = $scope.credit;
            var _company = $scope.user._tier._company;

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddCreditsModal.html",
              controller: function ($scope, $modalInstance) {

                $scope.newCredits = Number(credit.credits);

                $scope.credit = credit;

                $scope.handleCedits = function () {
                  $modalInstance.close($scope.course);
                };
              }
            });
            modal.result.then(function (course) {

              course._creators = [$scope.user._id];

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
