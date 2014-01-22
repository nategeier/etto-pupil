"use strict";

angular.module("ettoPupil")
  .controller("SettingsCtrl", ["$scope", "Tiers", "$routeParams",
    function ($scope, Tiers, $routeParams) {

      $scope.parentID = $routeParams.userID;

    }
  ]);
