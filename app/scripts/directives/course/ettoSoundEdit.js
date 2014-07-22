"use strict";

angular.module("ettoPupil")
  .directive("ettoSoundEdit", [

    function () {
      return {
        templateUrl: "/views/course/ettoSoundEdit.html",
        restrict: "EA",

        controller: function ($scope, $attrs) {

        },

        link: function postLink(scope, element, attrs) {

        }

      };
    }
  ]);
