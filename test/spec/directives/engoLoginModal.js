"use strict";

describe( "Directive: engoLoginModal", function() {
  var element, scope;

  // load the directive's module
  beforeEach( module( "engoPupil" ) );
  beforeEach( inject( function ( $rootScope ) {
    scope = $rootScope.$new();
  }));

  //it( "should make hidden element visible", inject( function ( $compile ) {
    //element = angular.element("<engo-login-modal></engo-login-modal>");
    //element = $compile(element)(scope);
    //expect(element.text()).toBe("this is the engoLoginModal directive");
  //}));
});
