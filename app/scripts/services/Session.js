'use strict';

angular.module('engoPupil')
.factory("Session", [ "$http", '$location', function ( $http, $location ) {
  /*
    var sdo = {
      isLogged: false,
      any: 'dave',
      user: null
    };

     //return sdo;
  
  $http.get('/api/v1/sessions/get_session').success(function(user){
    sdo.user = user
    
  });


  return sdo;
  

  */
  return {
      get_session: function(callback) {
          //$http.get('/api/v1/sessions/get_session');
          $http({method: 'GET', url: '/api/v1/sessions/get_session'})
            .success(function(data, status, headers, config){
              callback(data);
              //callback(data);
          }).
            error(function(data, status, headers, config) {
              console.log(data, 'err');
          });;
      },
       destroySession: function() {
          return $http.get('/api/v1/sessions/destroy');
      }
  }




}]);

