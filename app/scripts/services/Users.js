"use strict";

angular.module("ettoPupil")
  .factory("Users", ["$http", "$resource",
    function ($http, $resource) {
      var User;

      User = {
        //
        updateUsersTier: function (tier, callback) {

          $http.post("/api/v1/user/update_users_tier", tier)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              callback(data);
            });
        },

        listUsersCreatedCourses: function (id, callback) {
          var Courses = $resource("/api/v1/user/listUsersCreatedCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listUsersCourses: function (id, callback) {
          var Courses = $resource("/api/v1/user/listUsersCourses/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        listUserCoursesRecords: function (id, callback) {
          var Courses = $resource("/api/v1/user/listUserCoursesRecords/:id", {
            id: id
          });

          Courses.query(function (results) {
            callback(results);
          });
        },

        searchUser: function (text, callback) {
          var Search = $resource("/api/v1/user/searchUser/:text", {
            text: text
          });

          Search.query(function (results) {
            callback(results);
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
