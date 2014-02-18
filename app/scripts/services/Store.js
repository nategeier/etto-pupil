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
        findCard: function (id, callback) {

          $http.get("/api/v1/store/findCard/" + id)
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
        },
      };
    }
  ]);
