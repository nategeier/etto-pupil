'use strict';

describe('Directive: enrollgoBlock', function () {

  // load the directive's module
  beforeEach(module('enrollgoComposerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<enrollgo-block></enrollgo-block>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the enrollgoBlock directive');
  }));
});
