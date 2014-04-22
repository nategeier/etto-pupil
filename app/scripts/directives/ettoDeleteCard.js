"use strict";

angular.module("ettoPupil")
  .directive("ettoDeleteCard", ["$resource",

    function ($resource) {
      return {

        restrict: "AE",
        controller: function ($scope, $modal, Store, Endpoint) {

          $scope.deleteCard = function (companyId, cardId) {
            var Card = $resource(Endpoint("store", "deleteCard") + "/:companyId", {
              companyId: companyId,
              cardId: cardId
            });

            Card.get({
              companyId: companyId,
              cardId: cardId
            }, function (u, getResponseHeaders) {
              $scope.success = "Deleted";
              $scope.customer.active_card = null;

            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
