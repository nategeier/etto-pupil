'use strict';

describe('Directive: scaleBar', function () {

  // load the directive's module
  beforeEach(module('enrollgoComposerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scale-bar></scale-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scaleBar directive');
  }));
});
