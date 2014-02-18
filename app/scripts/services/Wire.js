"use strict";

angular.module("ettoPupil")
  .factory("Wire", ["$http",
    function ($http) {
      var Wire;

      Wire = {

        get: function (endUrl, callback) {

          $http.get("/api/v1/" + endUrl)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        post: function (url, obj, callback) {
          $http.post("/api/v1/" + url, obj)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
              console.dir(data);
            });
        }

      };

      //$rootScope.login = function() { Session.loginModal(); };

      return Wire;
    }
  ]);
