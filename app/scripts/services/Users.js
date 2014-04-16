"use strict";

angular.module("ettoPupil")
  .factory("Users", ["$http", "$resource",
    function ($http, $resource) {
      var User;

      User = {
        //
        updateUsersTier: function (tier, callback) {

          $http.post("https://archimedes.jit.su/user/update_users_tier", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        },

        listUsersCourses: function (id, callback) {
          var Courses = $resource("https://archimedes.jit.su/user/listUsersCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listUserCoursesRecords: function (id, callback) {
          var Courses = $resource("https://archimedes.jit.su/user/listUserCoursesRecords/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchUser: function (text, callback) {
          var Search = $resource("https://archimedes.jit.su/user/searchUser/:text", {
            text: text
          });

          Search.query(function (results) {
            callback(results);
          });
        },

        saveNewUser: function (user, callback) {

          $http.post("https://archimedes.jit.su/user/saveNewUser", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
              console.dir(data);
            });
        },

        inviteUser: function (data, callback) {

          $http.post("https://archimedes.jit.su/user/inviteUser", data)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        listUsersInTier: function (id, callback) {

          $http.get("https://archimedes.jit.su/user/listUsersInTier/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        fullDetails: function (id, callback) {

          $http.get("https://archimedes.jit.su/user/fullDetails/" + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        update: function (user, callback) {

          $http.post("https://archimedes.jit.su/user/update", user)
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
