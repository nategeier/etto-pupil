"use strict";

angular.module("ettoPupil")
  .directive("ettoDeleteCard", ["$resource",

    function ($resource) {
      return {

        restrict: "AE",
        controller: function ($scope, $modal, Store) {

          $scope.deleteCard = function (companyId, cardId) {
            console.log("daetete", companyId, cardId);

            var Card = $resource("/api/v1/store/deleteCard/:companyId", {
              companyId: companyId,
              cardId: cardId
            });

            Card.get({
              companyId: companyId,
              cardId: cardId
            }, function (u, getResponseHeaders) {
              console.log("responce", u);
              $scope.success = "Deleted";
              $scope.customer.active_card = null;

            });

            //Store.deleteCard("companyId=" + companyId + "")

          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);