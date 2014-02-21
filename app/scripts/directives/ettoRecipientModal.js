"use strict";

angular.module("ettoPupil")
  .directive("ettoRecipientModal", [
    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Store, $location, Tier) {

          $scope.addRecipient = function () {

            Tier.findTier($scope.user._tier._company, function (company) {

              $scope.recipient = company.recipientId;

              //$scope.recipient.type = "individual";

              var modal = $modal.open({
                templateUrl: "/views/directives/ettoRecipientModal.html",
                controller: function ($scope, $modalInstance) {

                  $scope.handleCancil = function () {
                    $modalInstance.close();
                  };

                  $scope.handlePurchase = function () {

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
