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
              callback(data);
              console.dir(data);
            });
        },

        saveNewUser: function (user, callback) {

          $http.post("/api/v1/user/saveNewUser", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
              console.dir(data);
            });
        },

        inviteUser: function (data, callback) {

          $http.post("/api/v1/user/inviteUser", data)
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

        fullDetails: function (id, callback) {

          $http.get("/api/v1/user/fullDetails/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        update: function (user, callback) {

          $http.post("/api/v1/user/update", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }

      };

      //$rootScope.login = function() { Session.loginModal(); };

      return User;
    }
  ]);
