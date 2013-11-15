"use strict";

describe( "Directive: engoModule", function () {
  var element, scope, ctrl;

  // load the directive's module
  beforeEach( module( "engoPupil" ) );

  beforeEach( inject( function( $rootScope, $compile ) {
    //scope = $rootScope.$new();
    scope = $rootScope;

    element = angular.element( "<engo-module></engo-module>" );
    element = $compile( element )( scope );
  }));

  //beforeEach( function() {
    //module( function( $provide ) {
      //$provide.value( "$document", {
        //keydown: function() { return null; }
      //});
    //});
  //});

  //it( "should know if it is in edit mode or not", inject( function( $compile ) {
    //expect( element.scope().editing ).toBeDefined();
  //}));

  //it( "should go to the next block", inject( function( $compile ) {
    //console.dir(scope)
    //expect( element.scope().nextBlock ).toBeDefined();
  //}));
});

