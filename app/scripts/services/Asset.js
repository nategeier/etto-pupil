"use strict";

angular.module("ettoPupil")
  .factory("Asset", ["$resource",
    function ($resource) {
      return {
        s3Url: function (callback) {
          var S3Url = $resource("/api/v1/asset/s3Url");

          S3Url.get(function (results) {
            console.log('res----', results)
            callback(results);
          });
        }
      };
    }
  ]);
