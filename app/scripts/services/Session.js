"use strict";

angular.module("ettoPupil")
  .factory("Session", ["$http", "$compile", "$document", "$modal", "$location", "$log", "$resource", "Endpoint",
    function ($http, $compile, $document, $modal, $location, $log, $resource, Endpoint) {

      var Session;

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
          $http({
            method: "GET",
            url: Endpoint("auth", "getSession"),
          })
            .success(function (data, status, headers, config) {
              callback(data);
            }).
          error(function (data, status, headers, config) {
            console.log(data, "err");
          });
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
            callback(results);
          });

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
