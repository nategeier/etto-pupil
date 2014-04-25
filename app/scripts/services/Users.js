"use strict";

angular.module("ettoPupil")
  .factory("Users", ["$http", "$resource", "Endpoint",
    function ($http, $resource, Endpoint) {
      var User;

      User = {
        updateUsersTier: function (tier, callback) {

          $http.post(Endpoint("user", "update_users_tier"), tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        },

        listUsersCourses: function (id, callback) {
          var Courses = $resource(Endpoint("user", "listUsersCourses") + "/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listUserCoursesRecords: function (id, callback) {
          var Courses = $resource(Endpoint("user", "listUserCoursesRecords") + "/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchUser: function (text, callback) {
          var Search = $resource(Endpoint("user", "searchUser") + "/:text", {
            text: text
          });

          Search.query(function (results) {
            callback(results);
          });
        },

        saveNewUser: function (user, callback) {

          $http.post(Endpoint("user", "saveNewUser"), user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
              console.dir(data);
            });
        },

        inviteUser: function (data, callback) {

          $http.post(Endpoint("user", "inviteUser"), data)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        listUsersInTier: function (id, callback) {

          $http.get(Endpoint("user", "listUsersInTier/") + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        inviteDetails: function (id, callback) {

          $http.get(Endpoint("user", "inviteDetails/") + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        fullDetails: function (id, callback) {

          $http.get(Endpoint("user", "fullDetails/") + id)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        update: function (user, callback) {

          $http.post(Endpoint("user", "update"), user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }

      };

      return User;
    }
  ]);
