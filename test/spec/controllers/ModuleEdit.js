'use strict';

describe('Controller: ModuleeditCtrl', function () {

  // load the controller's module
  beforeEach(module('engoPupil'));

  var ModuleeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModuleeditCtrl = $controller('ModuleeditCtrl', {
      $scope: scope
    });
  }));

});

