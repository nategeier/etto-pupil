'use strict';

describe('Directive: engoStorePurchase', function () {

  // load the directive's module
  beforeEach(module('enrollgoComposerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<engo-store-purchase></engo-store-purchase>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the engoStorePurchase directive');
  }));
});
