"use strict";

angular.module("ettoPupil")
  .factory("Store", ["$http",
    function($http) {
      return {
        courseStore: function(callback) {
          $http({
            method: "GET",
            url: "/api/v1/store/course_store"
          })
            .success(function(data, status, headers, config) {
              callback(data);
            })
            .error(function(data, status, headers, config) {
              callback(data);
            });
        },
        purchase: function(order, callback) {
          $http.post("/api/v1/store/purchase", order)
            .success(function(data, status, headers, config) {
              callback(data);
            })
            .error(function(data, status, headers, config) {
              console.dir(data);
            });
        },
        find: function(id, callback) {
          var obj = {
            _id: id
          };
          $http.post("/api/v1/store/find", obj)
            .success(function(data, status, headers, config) {
              callback(data);
            })
            .error(function(data, status, headers, config) {
              console.dir(data);
            });
        }
      };
    }
  ]);