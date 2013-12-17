"use strict";

angular.module("engoPupil")
  .factory("Module", ["$resource",
    function ($resource) {
      return $resource("/api/v1/module", {}, {
        update: {
          method: "PUT"
        }
      });
    }
  ])
  .factory("ModuleLoader", ["Module", "$route", "$q",
    function (Module, $route, $q) {
      return function () {
        var delay = $q.defer();
        Module.get({
          id: $route.current.params.moduleId
        }, function (module) {
          delay.resolve(module);
        }, function () {
          delay.reject("Unable to fetch module " + $route.current.params.moduleId);
        });
        return delay.promise;
      };
    }
  ]);
