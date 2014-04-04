"use strict";

angular.module("ettoPupil")
  .controller("PaymentsCtrl", ["$scope", "$routeParams", "Users", "Store", "Payment",
    function ($scope, $routeParams, Users, Store, Payment) {

      var id = $routeParams.userID;

      Users.fullDetails(id, function (user) {

        Store.payments(user._tier._company, function (results) {
          $scope.credit = results;
        });

        Payment.companyPurchases(user._tier._company, function (results) {
          $scope.purchases = results;
        });

        Payment.companyCreditsUsed(user._tier._company, function (results) {
          $scope.usedCredit = results;
        });

      });
    }
  ]);
