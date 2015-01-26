"use strict";

angular.module("ettoPupil")
  .directive("ettoChooseBlock", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal) {
          $scope.showOptions = function () {

            var blocktypes = $scope.blocktypes;

            var modal = $modal.open({
              templateUrl: "/views/blocks/ettoChooseBlock.html",
              windowClass: "app-modal-large",
              controller: function ($scope, $modalInstance) {

                $scope.blocktypes = blocktypes;

                $scope.chose = function (blockName) {

                  $modalInstance.close(blockName);
                };

              }
            });
            modal.result.then(function (blockName) {

              $scope.addBlock(blockName);
            });
          };
        },
        link: function postLink(scope, element, attrs) {
          //scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]);
