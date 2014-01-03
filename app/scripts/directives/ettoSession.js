"use strict";

angular.module("ettoPupil")
  .directive("ettoSession", ["Session",

    function (Session) {
      return {
        restrict: "EA",
         link: function (scope, element, attrs) {

          Session.get_session(function (data) {
            console.log(data)
            Session.treat_session(data);
            scope.user = data;
          });

        }
      };
    }
  ]);
