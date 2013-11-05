'use strict';

describe('Controller: ModuleviewCtrl', function () {

  // load the controller's module
  beforeEach(module('enrollgoComposerApp'));

  var ModuleviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModuleviewCtrl = $controller('ModuleviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
