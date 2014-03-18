"use strict";

angular.module("ettoPupil")
  .controller("SubscriptionCtrl", ["$scope", "$routeParams", "Users", "$resource", "Payment", "Tier",
    function ($scope, $routeParams, Users, $resource, Payment, Tier) {

      $scope.currentSubscription = 0;

      $scope.show = function (id) {
        $scope.onSubscription = id;
      };
      /*
      Payment.updateNewSubscription(function (argument) {
        console.log("updated");
      });
      */
      $scope.cancelSubscription = function () {
        Payment.cancelSubscription($scope.user._tier._company, $scope.currentSubscription, function (results) {
          $scope.subscriptionTypes = results;
          $scope.onSubscription = $scope.subscriptionTypes[0]._id;
          $scope.reset();
        });
      };

      $scope.reset = function () {

        Payment.subscriptions(function (results) {
          $scope.subscriptionTypes = results;
          $scope.onSubscription = $scope.subscriptionTypes[0]._id;
        });

        Users.fullDetails($routeParams.userID, function (user) {
          Tier.findTier(user._tier._company, function (results) {
            $scope.currentSubscription = results._subscription;
          });
        });

      };

      $scope.reset();

    }
  ]);
