"use strict";

angular.module("ettoPupil")
  .factory("Reports", ["$http",
    function ($http) {
      return {

        get_reports: function (link, parentID, callback) {

          var obj = {
            parentID: parentID
          }

          $http.post(link, obj)
            .success(function (data, status, headers, config) {

              //user = data.user;
              callback(data.err, data.results);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });


          /*
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
*/
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
        add_tier: function (newTier, callback) {
          $http.post("/api/v1/tier/add", newTier).success(function (data) {
            callback(data.err, data.results);
          });
        },
        delete_tier: function (tier, callback) {
          $http.post("/api/v1/tier/delete", tier).success(function (data) {
            callback(data.err, data.results);
          });
        },
        find_tier: function (tier, callback) {
          $http.post("/api/v1/tier/find", tier).success(function (data) {
            callback(data.err, data.results);
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
