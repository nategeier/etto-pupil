"use strict";

angular.module("ettoPupil")
  .factory("Session", ["$http", "$compile", "$document", "$modal", "$location", "$log",
    function ($http, $compile, $document, $modal, $location, $log) {

      var Session;

      Session = {
        treatSession: function (data, callback) {
          if (data.err && data.err === "Login" || !data) {
            $location.path("/");
          }
        },

        authenticate: function (user, callback) {
          $http.post("/api/v1/auth/local", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        getSession: function (callback) {
          $http({
            method: "GET",
            url: "/api/v1/auth/getSession"
          })
            .success(function (data, status, headers, config) {
              callback(data);
            }).
          error(function (data, status, headers, config) {
            console.log(data, "err");
          });
        },
        updateSession: function (user, callback) {
          $http.post("/api/v1/auth/updateSession", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        destroySession: function () {
          return $http.get("/api/v1/auth/destroy");
        },

        loginModal: function () {
          var modal = $modal.open({
            templateUrl: "views/directives/ettoLogin.html",
            controller: function ($scope) {}
          });
        }
      };

      return Session;
    }
  ]);
