"use strict";

angular.module("ettoPupil")
  .factory("httpInterceptor", function ($q, $rootScope) {
    return {
      // optional method
      "request": function (config) {
        // do something on success
        return config || $q.when(config);
      },

      // optional method
      "requestError": function (rejection) {
        // do something on error
        /*
        if (canRecover(rejection)) {
          return responseOrNewPromise;
        }
        */
        return $q.reject(rejection);

      },

      // optional method
      "response": function (response) {
        // do something on success
        return response || $q.when(response);
      },

      // optional method
      "responseError": function (rejection) {
        // do something on error
        if (rejection.status === 401) {
          $rootScope.$broadcast("401");
          //return responseOrNewPromise
        }
        return $q.reject(rejection);
      }
    };
  });

//$httpProvider.interceptors.push('httpInterceptor');
