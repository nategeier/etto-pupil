"use strict";

angular.module("ettoPupil")
  .controller("PaymentsCtrl", ["$scope", "$routeParams", "Users", "$resource",
    function ($scope, $routeParams, Users, $resource) {

      var id = $routeParams.userID;

      Users.fullDetails(id, function (user) {

        var Credit = $resource("/api/v1/store/findCredit/:id", {
          id: user._tier._company
        });

        Credit.get(function (u, getResponseHeaders) {
          $scope.credit = u;
        });
      });
    }
  ]);
