"use strict";

angular.module("ettoPupil")
  .directive("ettoRemoveTier", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, Tiers, $location) {
          $scope.removeTier = function (tier) {

            var modal = $modal.open({

              templateUrl: "/views/directives/ettoRemoveTierModal.html",
              controller: function ($scope, $modalInstance, Payment) {

                $scope.tier = tier;

                $scope.isSureRemove = function () {
                  $modalInstance.close(true);
                };

                $scope.cancel = function () {
                  $modalInstance.close(false);
                };

              }
            });
            modal.result.then(function (didRemove) {

              if (didRemove) {
                Tiers.removeTier(tier, function (data) {
                  //$scope.listUsersCreatedCourses();
                  $scope.reset();
                });
              }

            });
          };
        },
        link: function postLink(scope, element, attrs) {
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
