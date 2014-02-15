"use strict";

angular.module("ettoPupil")
  .directive("ettoAddTier", [

    function () {
      return {
        template: "<a class='btn btn-primary btn-xs' href='#' ng-click='addTier()'><i class='fa fa-plus-square-o'></i>Create</a>",
        restrict: "AE",
        controller: function ($scope, $modal, Tiers) {
          $scope.addTier = function () {

            console.log('step opn', $scope.parentID);

            var parentId = $scope.parentID;

            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAddTierModal.html",
              controller: function ($scope, $modalInstance) {
                $scope.handleNewTier = function (tier) {

                  console.log('step two', $scope.parentID)

                  tier.parent = parentId;
                  $modalInstance.close(tier);

                  console.log('step tier', tier)
                };
              }
            });
            modal.result.then(function (tier) {

              Tiers.addTier(tier, function (data) {
                $scope.reset();
                $scope.listUsers();
                if (data) {
                  //$scope.listUsersCreatedCourses();
                }
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
