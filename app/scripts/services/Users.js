"use strict";

angular.module("ettoPupil")
  .factory("Users", ["$http",
    function ($http) {
      var User;

      User = {

        update_users_tier: function (tier, callback) {
          console.log('gooooo------', tier)
          //$http.get("/api/v1/sessions/get_session");
          $http.post("/api/v1/user/update_users_tier", tier)
            .success(function (data, status, headers, config) {
              //user = data.user;
              console.log(data, 'ddddd------', headers)
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },
        invite_user: function (data, callback) {

          //$http.get("/api/v1/sessions/get_session");
          $http.post("/api/v1/user/invite_user", data)
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },


      };

      //$rootScope.login = function() { Session.loginModal(); };

      return User;
    }
  ]);
