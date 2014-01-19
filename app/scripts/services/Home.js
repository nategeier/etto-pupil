"use strict";

angular.module("ettoPupil")
  .factory("Home", ["$http",
    function($http) {

      // Public API here
      return {
        home_layout: function(callback) {
          $http({
            method: "GET",
            url: "/api/v1/sessions/home"
          })
            .success(function(data, status, headers, config) {
              callback(data);
            }).
          error(function(data, status, headers, config) {
            callback(data);
          });
        }
      };
    }
  ]);