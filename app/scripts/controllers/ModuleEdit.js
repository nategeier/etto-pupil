"use strict";

angular.module("engoPupil")
  .controller("ModuleEditCtrl", ["$scope", "module",
    function ($scope, module) {
      $scope.module = module;

      $scope.$on("module-save", function () {
        // TODO: Validate module before update
        $scope.module.$update();

        // Clear out the Toolbox
        angular.element(".engo-toolbox").empty();
      });
    }
  ]);
