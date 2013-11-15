'use strict';

angular.module('enrollgoComposerApp')
.factory("Session", [ "$http", function ( $http ) {
  //return $resource( "/api/v1/blocktype", {}, { update: { method: "PUT" }} );
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

}]);

