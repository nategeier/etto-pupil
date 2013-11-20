'use strict';

angular.module('engoPupil')
  .factory('Reports', [ '$http', function ($http) {

    return {
      get_reports: function (link, callback) {
        $http({method: 'GET', url: link})
          .success(function(data, status, headers, config){
            callback(data);
        }).
          error(function(data, status, headers, config) {
            console.log(data, 'err');
        });
      },

      brand_tree: function (callback) {
        $http({method: 'GET', url: '/api/v1/reports/brand_tree'})
          .success(function(data, status, headers, config){
            console.log(data);
            callback(data);
        }).
          error(function(data, status, headers, config) {
            console.log(data, 'err');
        });
      }

    };

  }]);
