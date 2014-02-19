"use strict";

angular.module("ettoPupil")
  .controller("BillingCtrl", ["$scope", "$routeParams", "Users", "$resource",
    function ($scope, $routeParams, Users, $resource) {

      var id = $routeParams.userID;

      $scope.show = function (num) {
        $scope.onSubscription = num;
      };

      Users.fullDetails(id, function (user) {

        var Subscriptions = $resource("/api/v1/store/getSubscriptions");

        Subscriptions.query(function (results) {
          $scope.subscriptionTypes = results;
          $scope.onSubscription = $scope.subscriptionTypes[0]._id;
        });
      });
    }
  ]);
