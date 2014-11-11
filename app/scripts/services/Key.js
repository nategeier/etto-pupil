"use strict";

angular.module("ettoPupil")
  .factory("Key", ["$http", "Endpoint",

    function ($http, Endpoint) {
      return {
        saveBambooKey: function (bambooKey, done) {
          $http.post(Endpoint("key", "saveBambooKey"), bambooKey)
            .success(function (data, status, headers, config) {
              done(data);
            })
            .error(function (data, status, headers, config) {
              done(data);
            });
        },
        findBambooKey: function (companyId, done) {

          var company = {
            companyId: companyId
          };

          $http.post(Endpoint("key", "find"), company)
            .success(function (data, status, headers, config) {
              done(null, data);
            })
            .error(function (data, status, headers, config) {
              done(data, null);
              console.dir(data);
            });
        }
      };
    }
  ]);
