'use strict';

describe('Directive: loggedInNav', function () {

  // load the directive's module
  beforeEach(module('enrollgoComposerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<logged-in-nav></logged-in-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loggedInNav directive');
  }));
});
