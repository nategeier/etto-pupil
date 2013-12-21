"use strict";

angular.module("ettoPupil")
  .factory("Reports", ["$http",
    function ($http) {

      return {
        get_reports: function (link, callback) {
          $http({
            method: "GET",
            url: link
          })
            .success(function (data, status, headers, config) {
              callback(data);
            }).
          error(function (data, status, headers, config) {
            console.log(data, "err");
          });
        },

        brand_tree: function (callback) {
          $http({
            method: "GET",
            url: "/api/v1/reports/brand_tree"
          })
            .success(function (data, status, headers, config) {
              console.log(data);
              callback(data);
            }).
          error(function (data, status, headers, config) {
            console.log(data, "err");
          });
        },
        create_level: function (newLevel, callback) {
          $http.post("/api/v1/reports/createLevel", newLevel).success(function (data) {
            callback(data);

          });
        },

        invite_user: function (newLevel, callback) {
          $http.post("/api/v1/sessions/invite_user", newLevel).success(function (data) {
            callback(data);
          });
        }

      };

    }
  ]);
