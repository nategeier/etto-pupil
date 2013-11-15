'use strict';

angular.module('engoPupil')
.factory("Session", [ "$http", function ( $http ) {
  /*
    var sdo = {
      isLogged: false,
      any: 'dave',
      user: null
    };

     return sdo;

  $http.get('/api/v1/sessions/get_session').success(function(user){
     sdo.user = user
    //return sdo;
  });

*/

  return {
      getSessions: function() {
          return $http.get('/api/v1/sessions/get_session');
      },
       destroySession: function() {
          console.log('ddd dritst')
          return $http.get('/api/v1/sessions/destroy');
      }
  };

}]);

