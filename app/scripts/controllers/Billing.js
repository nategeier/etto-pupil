"use strict";

angular.module("ettoPupil")
  .controller("BillingCtrl", ["$scope", "$routeParams", "Users", "$resource", "Payment", "Tier",
    function ($scope, $routeParams, Users, $resource, Payment, Tier) {

      $scope.show = function (id) {
        $scope.onSubscription = id;
      };
      /*
      Payment.updateNewSubscription(function (argument) {
        console.log("updated")
      });
      */

      Payment.subscriptions(function (results) {
        $scope.subscriptionTypes = results;
        $scope.onSubscription = $scope.subscriptionTypes[0]._id;
      });

      Users.fullDetails($routeParams.userID, function (user) {

        Tier.findTier(user._tier._company, function (results) {
          $scope.currentSubscription = results._subscription;
        });

      });
    }
  ]);
