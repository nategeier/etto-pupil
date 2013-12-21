"use strict";

describe( "Directive: ettoLoginModal", function() {
  var element, scope;

  // load the directive's module
  beforeEach( module( "ettoPupil" ) );
  beforeEach( inject( function ( $rootScope ) {
    scope = $rootScope.$new();
  }));

  //it( "should make hidden element visible", inject( function ( $compile ) {
    //element = angular.element("<etto-login-modal></etto-login-modal>");
    //element = $compile(element)(scope);
    //expect(element.text()).toBe("this is the ettoLoginModal directive");
  //}));
});
