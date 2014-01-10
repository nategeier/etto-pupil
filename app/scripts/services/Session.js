"use strict";

angular.module("ettoPupil")
  .factory("Session", ["$http", "$compile", "$document", "$modal", "$location",
    function ($http, $compile, $document, $modal, $location) {
      var Session, user;

      Session = {
        treat_session : function(data, callback){
          if(data.err && data.err == 'Login' || !data){
            $location.path('/');
          }
        },
        get_session: function (callback) {
          $http({
            method: "GET",
            url: "/api/v1/auth/get_session"
          })
            .success(function (data, status, headers, config) {
              callback(data);
            }).
          error(function (data, status, headers, config) {
            console.log(data, "err");
          });
        },
        update_session: function (user, callback) {
          console.log('post', user)
          //$http.get("/api/v1/sessions/get_session");
         $http.post('/api/v1/auth/update_session', user)
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
            controller: function ($scope) {
              console.log("stuff");
            }
          });
        }
      };

      return Session;
    }
  ]);
