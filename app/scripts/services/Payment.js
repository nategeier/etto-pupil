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
        },
        cancelSubscription: function (companyId, subscriptionId, callback) {
          var Subscriptions = $resource("/api/v1/store/cancelSubscription/:companyId", {
            companyId: companyId,
            subscriptionId: subscriptionId
          });
          Subscriptions.query(function (results) {
            callback(results);
          });
        },

        checkCanAddCourse: function (companyId, callback) {
          var Subscriptions = $resource("/api/v1/store/checkCanAddCourse/:companyId", {
            companyId: companyId
          });
          Subscriptions.get(function (results) {
            callback(results);
          });
        }

      };
    }
  ]);
