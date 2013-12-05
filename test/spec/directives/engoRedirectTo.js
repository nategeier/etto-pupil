'use strict';

describe('Directive: engoRedirectTo', function () {

  // load the directive's module
  beforeEach(module('engoPupil'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  //it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<engo-redirect-to></engo-redirect-to>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the engoRedirectTo directive');
  //}));
});
