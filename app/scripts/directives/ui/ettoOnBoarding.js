"use strict";

angular.module("ettoPupil")
  .directive("ettoOnBoarding", [

    function () {
      return {
        restrict: "EA",
        templateUrl: "/views/directives/ettoOnBoarding.html",
        controller: function ($scope, CourseList) {

          CourseList.getOnboardingCourses(function (courses) {
            $scope.onboardingCourses = courses;
          });
        },
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
