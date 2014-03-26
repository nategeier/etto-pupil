"use strict";

angular.module("ettoPupil")
  .directive("ettoSearchTiers", [

    function () {
      return {
        restrict: "EA",
        controller: function ($scope, Tier) {

          $scope.searchTiers = function () {
            if ($scope.tierSearch !== "") {
              Tier.searchTiers($scope.tierSearch, function (results) {
                $scope.foundTiers = results;
              });
            }

          };
        },
        link: function postLink(scope, element, attrs) {

        }
      };
    }
  ]);
