'use strict';

describe('Directive: store', function () {

  // load the directive's module
  beforeEach(module('enrollgoComposerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<store></store>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the store directive');
  }));
});
