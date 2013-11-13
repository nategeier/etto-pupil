'use strict';

describe('Controller: ModuleeditCtrl', function () {

  // load the controller's module
  beforeEach(module('enrollgoComposerApp'));

  var ModuleeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModuleeditCtrl = $controller('ModuleeditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
