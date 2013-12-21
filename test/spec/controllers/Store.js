'use strict';

describe('Controller: StoreCtrl', function () {

  // load the controller's module
  beforeEach(module('ettoPupil'));

  var StoreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoreCtrl = $controller('StoreCtrl', {
      $scope: scope
    });
  }));

});
