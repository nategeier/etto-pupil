'use strict';

angular.module('engoPupil')
  .factory('Store', ['$http', function ($http) {

    return {
      course_store: function (callback) {
        $http({method: 'GET', url: '/api/v1/store/course_store'})
          .success(function(data, status, headers, config){
          callback(data);
        })
          .error(function(data, status, headers, config) {
            callback(data);
        });
      },
      purchase_course: function (courseID, callback) {
        $http({method: 'GET', url: '/api/v1/store/purchase_course/' + courseID})
          .success(function(data, status, headers, config){
          callback(data);
        })
          .error(function(data, status, headers, config) {
            callback(data);
        });
      }
    };
}]);