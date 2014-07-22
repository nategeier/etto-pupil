"use strict";

angular.module("ettoPupil")
  .controller("AssetLibrary", ["$scope", "$compile", "assets",
    function ($scope, $compile, assets) {
      $scope.assets = assets;

      $scope.deleteAsset = function (index) {
        $scope.assets[index].$delete();
        $scope.assets.splice(index, 1);
      };

      $scope.isImage = function (url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
      };

      $scope.fileName = function (url) {
        return url.substring(url.lastIndexOf("/") + 1);
      };
    }
  ]);
