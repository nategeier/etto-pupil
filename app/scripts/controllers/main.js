"use strict";

angular.module("ettoPupil")
  .controller("MainCtrl", ["$scope", "$location", "Session", "Payment",
    function ($scope, $location, Session, Payment) {

      $scope.currentSubscription = 0;

      $scope.show = function (id) {
        $scope.onSubscription = id;
      };

      Payment.subscriptions(function (results) {
        $scope.subscriptionTypes = results;
        $scope.onSubscription = $scope.subscriptionTypes[0]._id;
      });

      Session.getSession(function (data) {
        if (data) {
          $location.path("/etto");
        }
      });

    }
  ]);
