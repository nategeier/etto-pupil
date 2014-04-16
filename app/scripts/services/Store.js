"use strict";

angular.module("ettoPupil")
  .factory("Store", ["$http", "$resource",
    function ($http, $resource) {
      return {
        payments: function (id, callback) {
          var Credit = $resource("https://archimedes.jit.su/store/findCredit/:id", {
            id: id
          });

          Credit.get(function (u, getResponseHeaders) {
            callback(u);
          });
        },
        courseStore: function (callback) {
          $http({
            method: "GET",
            url: "https://archimedes.jit.su/store/course_store"
          })
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        },
        purchase: function (order, callback) {
          $http.post("https://archimedes.jit.su/store/purchase", order)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        createRecipient: function (recipient, callback) {
          $http.post("https://archimedes.jit.su/store/createRecipient", recipient)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        findCards: function (id, callback) {

          $http.get("https://archimedes.jit.su/store/findCards/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        deleteCards: function (url, callback) {

          $http.get("https://archimedes.jit.su/store/deleteCards/" + url)
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
            url: "https://archimedes.jit.su/store/findCredit/" + id
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
