'use strict';

describe('Controller: NewbrandCtrl', function () {

  // load the controller's module
  beforeEach(module('engoPupil'));

  var NewbrandCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewbrandCtrl = $controller('NewbrandCtrl', {
      $scope: scope
    });
  }));

});
