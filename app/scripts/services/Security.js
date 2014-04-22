"use strict";

angular.module("ettoPupil")
  .factory("Security", ["$http", "$resource",
    function ($http, $resource) {
      var Security;

      Security = {

        sendForgotPw: function (email, callback) {
          var sendEmail = $resource("/api/v1/user/sendForgotPw/:email", {
            email: email
          });

          sendEmail.get(function (results) {
            callback(results);
          });
        },
        verifyPasswordReset: function (code, callback) {
          var verifyPasswordReset = $resource("/api/v1/user/verifyPasswordReset/:code", {
            code: code
          });

          verifyPasswordReset.get(function (results) {
            callback(results);
          });
        },
        updatePassword: function (user, callback) {

          $http.post("/api/v1/user/updatePassword", user)
            .success(function (data, status, headers, config) {
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        }

      };

      //$rootScope.login = function() { Session.loginModal(); };

      return Security;
    }
  ]);
