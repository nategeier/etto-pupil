"use strict";

angular.module("ettoPupil")
  .directive("ettoCourseNav", [

    function () {
      return {
        templateUrl: "/views/course/ettoCourseNav.html",
        restrict: "EA",

        controller: function ($scope, $attrs) {},
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
