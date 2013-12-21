"use strict";

describe("Controller: ModuleviewCtrl", function () {

  // load the controller's module
  beforeEach(module("ettoPupil"));

  var ModuleviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModuleviewCtrl = $controller("ModuleviewCtrl", {
      $scope: scope
    });
  }));

});

