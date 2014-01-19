"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Session",

    function(Session) {
      return {
        restrict: "EA",
        link: function(scope, element, attrs) {
          Session.getSession(function(data) {
            Session.treatSession(data);
            scope.user = data;
          });

        }
      };
    }
  ]);