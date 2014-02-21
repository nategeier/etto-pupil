"use strict";

angular.module("ettoPupil")
  .factory("Payment", ["$resource",
    function ($resource) {
      return {
        subscriptions: function (callback) {
          var Subscriptions = $resource("/api/v1/store/getSubscriptions");

          Subscriptions.query(function (results) {
            callback(results);
          });
        }
      };
    }
  ]);
