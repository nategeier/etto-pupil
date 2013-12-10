"use strict";

describe( "Directive: notLoggedInNav", function() {
  var element, scope;

  beforeEach( module( "engoPupil", "views/directives/engoNotLoggedInNav.html" ) );
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element("<engo-not-logged-in-nav></engo-not-logged-in-nav>");
    element = $compile(element)(scope);
  }));

  it("should make hidden element visible", function() {
    scope.$digest();
    expect(element.text()).toBe("Toggle navigationLogin");
  });
});
