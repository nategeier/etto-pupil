"use strict";

angular.module("ettoPupil")
  .directive("ettoSettingsNav", ["Session",

    function (Session) {
      return {
        restrict: "EA",
        templateUrl: "/views/directives/ettoSettingsNav.html",
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
