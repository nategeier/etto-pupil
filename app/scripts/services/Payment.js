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
        },
        updateNewSubscription: function (callback) {
          var Subscriptions = $resource("/api/v1/store/updateNewSubscription");

          Subscriptions.query(function (results) {
            callback(results);
          });
        }
      };
    }
  ]);