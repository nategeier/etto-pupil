"use strict";

describe("Directive: enrollgoModule", function () {

  // load the directive's module
  beforeEach(module("engoPupil"));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it("should make hidden element visible", inject(function ($compile) {
    element = angular.element("<enrollgo-module></enrollgo-module>");
    element = $compile(element)(scope);
    expect(element.text()).toBe("this is the enrollgoModule directive");
  }));
});
