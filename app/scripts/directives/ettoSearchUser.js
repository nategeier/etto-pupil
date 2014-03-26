"use strict";

angular.module("ettoPupil")
  .directive("ettoSearchUser", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, Users) {

          $scope.searchUser = function () {

            Users.searchUser($scope.userSearch, function (results) {
              $scope.foundUsers = results;
            });
          };
        },
        link: function postLink(scope, element, attrs) {

        }
      };
    }
  ]);
