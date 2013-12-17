"use strict";

angular.module("engoPupil")
  .factory("Session", ["$http", "$compile", "$document", "$modal",
    function ($http, $compile, $document, $modal) {
      var Session, user;

      Session = {
        get_session: function (callback) {
          //$http.get("/api/v1/sessions/get_session");
          $http({
            method: "GET",
            url: "/api/v1/sessions/get_session"
          })
            .success(function (data, status, headers, config) {
              callback(data);
            }).
          error(function (data, status, headers, config) {
            console.log(data, "err");
          });
        },
        destroySession: function () {
          return $http.get("/api/v1/sessions/destroy");
        },

        authenticate: function (user, callback) {
          $http.post("/api/v1/sessions/start_session", user)
            .success(function (data, status, headers, config) {
              //user = data.user;
              callback(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        register_invite: function (user, callback) {
          $http.post("/api/v1/sessions/register_invite", user)
            .success(function (data, status, headers, config) {
              user = data.user;

              callback(data.user);
              console.dir(data);
            })
            .error(function (data, status, headers, config) {
              console.dir(data);
            });
        },

        //authenticate: function( email, password ) {
        //$http.post( "/api/v1/sessions/start_session", {
        //email: email,
        //password: password
        //})
        //.success( function( data, status, headers, config ) {
        //user = data.user;
        //console.dir( data );
        //})
        //.error( function( data, status, headers, config ) {
        //console.dir( data );
        //});
        //},

        //loginModal: function() {
        //var modal;

        //modal = $compile( "<engo-modal id='login-modal'><engo-login></engo-login></engo-modal>" )( $rootScope );
        //if ($rootScope.$root.$$phase !== "$apply" && $rootScope.$root.$$phase !== "$digest") {
        //$rootScope.$apply();
        //}
        //modal.appendTo( "#view" );
        //modal.foundation( "reveal", "open" );
        //}

        loginModal: function () {
          var modal = $modal.open({
            templateUrl: "views/directives/engoLogin.html",
            controller: function ($scope) {
              console.log("stuff");
            }
          });
        }
      };

      //$rootScope.login = function() { Session.loginModal(); };

      return Session;
    }
  ]);
