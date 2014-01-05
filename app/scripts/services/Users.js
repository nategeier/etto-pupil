"use strict";

angular.module("ettoPupil")
  .factory("Users", ["$http",
    function ($http) {
      var User;

      User = {

        update_users_tier: function (data, callback) {

          //$http.get("/api/v1/sessions/get_session");
          $http.post("/api/v1/user/update_users_tier", data)
            .success(function (data, status, headers, config) {
              //user = data.user;
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
