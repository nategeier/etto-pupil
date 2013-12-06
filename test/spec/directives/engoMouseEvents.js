'use strict';

describe('Directive: engoMouseEvents', function () {

  // load the directive's module
  beforeEach(module('engoPupil'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  //it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<engo-mouse-events></engo-mouse-events>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the engoMouseEvents directive');
  //}));
});
