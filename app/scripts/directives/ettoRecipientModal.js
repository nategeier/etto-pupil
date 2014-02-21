"use strict";

angular.module("ettoPupil")
  .directive("ettoRecipientModal", [
    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Store, $location, Tier) {

          $scope.addRecipient = function () {

            Tier.findTier($scope.user._tier._company, function (company) {

              var modal = $modal.open({
                templateUrl: "/views/directives/ettoRecipientModal.html",
                controller: function ($scope, $modalInstance) {

                  $scope.recipient = {};

                  if (company.recipientId) {
                    $scope.recipient.id = company.recipientId;
                  } else {
                    $scope.recipient.type = "corporation";
                  }

                  $scope.typeOptions = [{
                    value: "individual",
                    title: "Individual"
                  }, {
                    value: "corporation",
                    title: "Corporation"
                  }];

                  $scope.handleCancil = function () {
                    $modalInstance.close();
                  };

                  $scope.createRecipient = function () {

                    $scope.err = $scope.recipient;

                    $scope.recipient.type = $scope.recipient.type.value;
                    //--- Currentl Stripe only allows US for recipients
                    $scope.recipient.bank_account.country = "US";
                    Store.createRecipient($scope.recipient, function (results) {
                      $scope.err = results;
                    });

                  };
                }
              });

            });

          };
        },
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);
