"use strict";

angular.module("ettoPupil")
  .controller("LandingCtrl", ["$q", "$scope", "Session", "Payment", "WhiteLabel", "$state",
    function ($q, $scope, Session, Payment, WhiteLabel, $state) {

      $scope.currentSubscription = 0;

      $scope.show = function (id) {
        $scope.onSubscription = id;
      };

      Payment.subscriptions(function (results) {
        $scope.subscriptionTypes = results;
        $scope.onSubscription = $scope.subscriptionTypes[0]._id;
      });

      Session.getSession(function (user) {
        if (user) {
          $state.go("home");
        } else {
          WhiteLabel.setFonts("Lato");
        }
      });

    }
  ]);
