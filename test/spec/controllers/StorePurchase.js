'use strict';

describe('Controller: StorepurchaseCtrl', function () {

  // load the controller's module
  beforeEach(module('enrollgoComposerApp'));

  var StorepurchaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StorepurchaseCtrl = $controller('StorepurchaseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
