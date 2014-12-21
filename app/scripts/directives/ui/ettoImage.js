"use strict";

angular.module("ettoPupil")
  .directive("ettoImage", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope) {
          $scope.updateThumb = function () {
            $scope.showAssetLibrary(390, 200, function (asset) {
              $scope.course.thumb = asset.url;
              $scope.saveCourse();
            });
          };

          $scope.updateBlockImage = function (block, name, w, h) {

            $scope.showAssetLibrary(w, h, function (asset) {
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
