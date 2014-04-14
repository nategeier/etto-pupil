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
        cancelSubscription: function (companyId, subscriptionId, callback) {
          var Subscriptions = $resource("/api/v1/store/cancelSubscription/:companyId", {
            companyId: companyId,
            subscriptionId: subscriptionId
          });
          Subscriptions.get(function (results) {
            callback(results);
          });
        },
        companyPurchases: function (companyId, callback) {
          var Purchases = $resource("/api/v1/credit/companyPurchases/:id", {
            id: companyId
          });
          Purchases.query(function (results) {
            callback(results);
          });
        },

        companyRecieved: function (companyId, callback) {
          var Payment = $resource("/api/v1/credit/companyRecieved/:id", {
            id: companyId
          });
          Payment.query(function (results) {
            callback(results);
          });
        },

        companyCreditsUsed: function (companyId, callback) {
          var Used = $resource("/api/v1/credit/companyCreditsUsed/:id", {
            id: companyId
          });
          Used.get(function (results) {
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
