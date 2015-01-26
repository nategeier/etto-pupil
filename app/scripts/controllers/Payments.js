"use strict";

angular.module("ettoPupil")
  .controller("PaymentsCtrl", ["$scope", "$stateParams", "Users", "Store", "Payment",
    function ($scope, $stateParams, Users, Store, Payment) {

      var id = $stateParams.userID;

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

        Payment.companyRecieved(user._tier._company, function (results) {
          $scope.payments = results;
        });

      });
    }
  ]);
