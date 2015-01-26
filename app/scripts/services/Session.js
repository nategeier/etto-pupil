"use strict";

angular.module("ettoPupil")
  .factory("Session", ["$http", "$compile", "$document", "$modal", "$location", "$log", "$resource", "Endpoint",

    function ($http, $compile, $document, $modal, $location, $log, $resource, Endpoint) {

      var Session,
        currentUser = null;

      Session = {

        treatSession: function (data, callback) {
          if (data.err && data.err === "Login" || !data) {
            $location.path("/");
          }
        },

        authenticate: function (user, callback) {
          $http.post(Endpoint("auth", "local"), user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        getSession: function (callback) {

          $http.get(Endpoint("auth", "getSession"))
            .success(function (data, status, headers, config) {
              currentUser = data;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });

        },
        currentUser: function () {
          return currentUser;
        },
        updateSession: function (user, callback) {
          $http.post(Endpoint("auth", "updateSession"), user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        destroySession: function (callback) {

          var Logout = $resource(Endpoint("auth", "logout"));

          Logout.get(function (results) {
            currentUser = null;
            callback(results);
          });

        },
        checkIfCanEditCourse: function (user, courseId, creator) {

          if (user._tier._company === creator && user.auth.canCreateCourses) {
            return true;
          }
          return false;
        },

        loginModal: function () {
          var modal = $modal.open({
            templateUrl: "/views/directives/ettoLoginModal.html",
            controller: "LoginCtrl"
          });
        }
      };

      return Session;
    }
  ]);
