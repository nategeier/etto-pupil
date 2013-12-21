'use strict';

describe('Controller: StorepurchaseCtrl', function () {

  // load the controller's module
  beforeEach(module('ettoPupil'));

  var StorepurchaseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StorepurchaseCtrl = $controller('StorepurchaseCtrl', {
      $scope: scope
    });
  }));

});
