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

          //$http.get("/api/v1/sessions/get_session");
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
        destroySession: function () {
          return $http.get("/api/v1/auth/destroy");
        },
        /*
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
        */
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

        //modal = $compile( "<etto-modal id='login-modal'><etto-login></etto-login></etto-modal>" )( $rootScope );
        //if ($rootScope.$root.$$phase !== "$apply" && $rootScope.$root.$$phase !== "$digest") {
        //$rootScope.$apply();
        //}
        //modal.appendTo( "#view" );
        //modal.foundation( "reveal", "open" );
        //}

        loginModal: function () {
          var modal = $modal.open({
            templateUrl: "views/directives/ettoLogin.html",
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
