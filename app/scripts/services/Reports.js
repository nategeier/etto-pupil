'use strict';

angular.module('engoPupil')
  .factory('Reports', [ '$http', function ($http) {
    // Service logic
    // ...
    console.log('mad itss')

    var meaningOfLife = 42;

    // Public API here
    return {
      get_reports: function (link, callback) {
        $http({method: 'GET', url: link})
          .success(function(data, status, headers, config){
            callback(data);
        }).
          error(function(data, status, headers, config) {
            console.log(data, 'err');
        });;
      }
    };
  }]);
