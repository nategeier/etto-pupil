"use strict";

angular.module("ettoPupil")
  .factory("Endpoint", ["$rootScope",
    function ($rootScope) {

      var Endpoint;

      Endpoint = function (resource, method) {
        // TODO: add options param so $rootScope.config can be overridden
        var terms = [];
        terms.push($rootScope.config.api.version);

        if (resource) {
          terms.push(resource);
        }

        if (method) {
          terms.push(method);
        }

        return $rootScope.config.api.server + terms.join("/");
      };

      return Endpoint;
    }
  ]);
