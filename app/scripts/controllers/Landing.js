"use strict";

angular.module("ettoPupil")
  .controller("LandingCtrl", ["$scope", "$location", "Session", "Payment", "WhiteLabel",
    function ($scope, $location, Session, Payment, WhiteLabel) {

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
        } else {
          WhiteLabel.setFonts("Lato");
        }
      });

    }
  ]);
