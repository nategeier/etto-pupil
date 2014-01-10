"use strict";

angular.module("ettoPupil")
  .factory("Tiers", ["$http",
    function ($http) {
      return {

        list_children_and_count_users: function (tier, callback) {

          $http.post('/api/v1/tier/list_children_and_count_users', tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
          });
        },

        add_tier: function (newTier, callback) {
          $http.post("/api/v1/tier/add", newTier).success(function (data) {
            callback(data);
          });
        },
        remove_tier: function (tier, callback) {
          $http.post("/api/v1/tier/remove", tier).success(function (data) {
            callback(data);
          });
        },
        find_tier: function (tier, callback) {
          $http.get("/api/v1/tier/52d0291070eafae05ca187d1").success(function (data) {
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
