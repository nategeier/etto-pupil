'use strict';

describe('Directive: engoDeligateTo', function () {

  // load the directive's module
  beforeEach(module('enrollgoComposerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<engo-deligate-to></engo-deligate-to>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the engoDeligateTo directive');
  }));
});
