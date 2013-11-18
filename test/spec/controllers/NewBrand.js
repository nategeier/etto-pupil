'use strict';

describe('Controller: NewbrandCtrl', function () {

  // load the controller's module
  beforeEach(module('enrollgoComposerApp'));

  var NewbrandCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewbrandCtrl = $controller('NewbrandCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
