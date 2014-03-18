"use strict";

angular.module("ettoPupil")
  .directive("ettoAddTier", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tiers) {
          $scope.addTier = function () {

            var parentId = $scope.parentID;

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddTierModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.handleNewTier = function (tier) {

                  tier.parent = parentId;
                  $modalInstance.close(tier);
                };
              }
            });
            modal.result.then(function (tier) {
              Tiers.addTier(tier, function (data) {
                $scope.reset();
                $scope.listUsers();
              });
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
