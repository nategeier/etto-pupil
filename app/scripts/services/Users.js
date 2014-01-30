"use strict";

angular.module("ettoPupil")
  .factory("Users", ["$http",
    function ($http) {
      var User;

      User = {

        updateUsersTier: function (tier, callback) {

          $http.post("/api/v1/user/update_users_tier", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        inviteUser: function (data, callback) {

          $http.post("/api/v1/user/invite_user", data)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        listUsersInTier: function (id, callback) {

          $http.get("/api/v1/user/listUsersInTier/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

      };

      //$rootScope.login = function() { Session.loginModal(); };

      return User;
    }
  ]);