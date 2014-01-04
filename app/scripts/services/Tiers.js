"use strict";

angular.module("ettoPupil")
  .factory("Tiers", ["$http",
    function ($http) {
      return {

        list_children_and_count_users: function (parentID, callback) {

          var obj = {
            parentID: parentID
          }

          $http.post('/api/v1/tier/list_children_and_count_users', obj)
            .success(function (data, status, headers, config) {
              callback(data.err, data.results);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
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
