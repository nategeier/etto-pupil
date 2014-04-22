"use strict";

/**
 * @module Asset
 * Asset.js
 * ============================================================================
 *
 * Creates AngularJS services "Asset" and "AssetLoader".
 *
 */
angular.module("ettoPupil")
/**
 * Asset
 *
 * @param {asset} newAsset Optional new asset information.
 */
.factory("Asset", ["$rootScope", "$resource", "$http",
  function ($rootScope, $resource, $http) {
    var resourceName = "asset";
    var resourceBase = $rootScope.config.api.server + [$rootScope.config.api.version, resourceName].join("/");

    var Asset = $resource(resourceBase, {}, {
      update: {
        method: "PUT"
      }
    });

    Asset.prototype.getS3Policy = function (mimetype, done) {
      var self = this;

      $http
        .get(resourceBase + "/getS3Policy?mimeType=" + mimetype)
        .success(function (response) {
          self.s3 = response;
          done(response);
        });
    };

    return Asset;
  }
])

/**
 * AssetLoader
 *
 * @param {Object} findParams Optional keys to pass to find
 */
.factory("AssetLoader", ["Asset", "$route", "$q",
  function (Asset, $route, $q) {
    return function () {
      var delay = $q.defer();
      Asset.get({
        id: $route.current.params.assetId
      }, function (asset) {
        delay.resolve(asset);
      }, function () {});
      return delay.promise;
    };
  }
]);
