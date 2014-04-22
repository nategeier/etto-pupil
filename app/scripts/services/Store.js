"use strict";

angular.module("ettoPupil")
  .factory("Store", ["$http", "$resource", "Endpoint",
    function ($http, $resource, Endpoint) {
      return {
        payments: function (id, callback) {
          var Credit = $resource(Endpoint("store", "findCredit") + "/:id", {
            id: id
          });

          Credit.get(function (u, getResponseHeaders) {
            callback(u);
          });
        },
        courseStore: function (callback) {
          $http({
            method: "GET",
            url: Endpoint("store", "course_store"),
          })
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        },
        purchase: function (order, callback) {
          $http.post(Endpoint("store", "purchase"), order)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        createRecipient: function (recipient, callback) {
          $http.post(Endpoint("store", "createRecipient"), recipient)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        findCards: function (id, callback) {

          $http.get(Endpoint("store", "findCards/") + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        deleteCards: function (url, callback) {

          $http.get(Endpoint("store", "deleteCards/") + url)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        findCredit: function (id, callback) {
          $http({
            method: "GET",
            url: Endpoint("store", "findCredit/") + id
          })
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        }
      };
    }
  ]);
