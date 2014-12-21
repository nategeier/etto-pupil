"use strict";

angular.module("ettoPupil")
  .directive("ettoSearchUser", [

    function () {
      return {
        restrict: "EA",
        templateUrl: "/views/directives/ettoSearchUser.html",
        controller: function ($scope, Users) {

          $scope.searchUser = function () {

            Users.searchUser($scope.userSearch, $scope.currentTier._id, function (results) {
              $scope.foundUsers = results;
            });
          };
        },
        link: function postLink(scope, element, attrs) {

        }
      };
    }
  ]);
