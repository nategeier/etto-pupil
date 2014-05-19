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
.factory("Asset", ["$rootScope", "$resource", "$http", "Endpoint",
  function ($rootScope, $resource, $http, Endpoint) {
    var resourceName = "asset";
    var resourceBase = $rootScope.config.api.server + [$rootScope.config.api.version, resourceName].join("/");

    var Asset = $resource(Endpoint("asset", ":_id"), {
      _id: "@_id"
    }, {
      update: {
        method: "PUT"
      }
    });

    Asset.prototype.getS3Policy = function (fileObj, done) {
      var self = this;

      $http
        .get(resourceBase + "/getS3Policy?fileName=" + fileObj.name + "&mimeType=" + fileObj.type)
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

      if ($route.current.params.assetId) {
        Asset.get({
          id: $route.current.params.assetId
        }, function (asset) {
          delay.resolve(asset);
        }, function () {});
      } else {
        Asset.query({}, function (assets) {
          delay.resolve(assets);
        }, function () {});
      }

      return delay.promise;
    };
  }
]);
