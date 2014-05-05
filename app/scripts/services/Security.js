"use strict";

angular.module("ettoPupil")
  .factory("Security", ["$http", "$resource", "Endpoint",
    function ($http, $resource, Endpoint) {
      var Security;

      Security = {

        sendForgotPw: function (email, callback) {
          var user = {
            email: email
          };

          $http.post(Endpoint("user", "sendForgotPw"), user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        verifyPasswordReset: function (code, callback) {
          var verifyPasswordReset = $resource(Endpoint("user", "verifyPasswordReset") + "/:code", {
            code: code
          });

          verifyPasswordReset.get(function (results) {
            callback(results);
          });
        },
        updatePassword: function (user, callback) {

          $http.post(Endpoint("user", "updatePassword"), user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }

      };

      return Security;
    }
  ]);
