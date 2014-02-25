"use strict";

angular.module("ettoPupil")
  .factory("Store", ["$http",
    function ($http) {
      return {
        courseStore: function (callback) {
          $http({
            method: "GET",
            url: "/api/v1/store/course_store"
          })
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        },
        purchase: function (order, callback) {
          $http.post("/api/v1/store/purchase", order)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        createRecipient: function (recipient, callback) {
          $http.post("/api/v1/store/createRecipient", recipient)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        findCards: function (id, callback) {

          $http.get("/api/v1/store/findCards/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        deleteCards: function (url, callback) {

          $http.get("/api/v1/store/deleteCards/" + url)
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
            url: "/api/v1/store/findCredit/" + id
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
