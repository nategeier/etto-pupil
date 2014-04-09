"use strict";

angular.module("ettoPupil")
  .directive("ettoImage", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope) {
          $scope.updateThumb = function () {
            $scope.showAssetLibrary(function (asset) {
              $scope.course.thumb = asset.url;
              $scope.saveCourse();
            });
          };

          $scope.updateBlock = function (block, name) {
            $scope.showAssetLibrary(function (asset) {
              block.data[name] = asset.url;
              $scope.saveCourse();
            });
          };
        },
        link: function (scope, element, attrs) {

        }
      };
    }
  ]);
