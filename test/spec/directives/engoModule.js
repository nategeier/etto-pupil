"use strict";

describe( "Directive: engoModule", function () {
  var httpBackend, element, scope;

  // load the directive's module
  beforeEach( module( "engoPupil", "views/directives/engoModule.html" ) );

  beforeEach( inject( function( $rootScope, $compile, $httpBackend ) {
    scope = $rootScope.$new();
    scope.module = {
      blocks: [{},{},{}]
    };

    element = angular.element( "<engo-module></engo-module>" );
    element = $compile( element )( scope );

    httpBackend = $httpBackend;
    httpBackend.when( "GET", "/api/v1/blocktype?" ).respond([]);

    //$provide.value( "$document", {
      //keydown: function() { return null; }
    //});
  }));

  afterEach( function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it( "should know if it is in edit mode or not", function() {
    httpBackend.expectGET( "/api/v1/blocktype?" );
    scope.$digest();
    expect( element.scope().editing ).toBeDefined();
    httpBackend.flush();
  });

  it( "should know there are three blocks in the mock module", function() {
    httpBackend.expectGET( "/api/v1/blocktype?" );
    scope.$digest();
    expect( element.scope().module.blocks.length ).toBe( 3 );
    httpBackend.flush();
  });

  it( "should go to the next block", function() {
    httpBackend.expectGET( "/api/v1/blocktype?" );
    scope.$digest();
    expect( element.scope().nextBlock ).toBeDefined();
    httpBackend.flush();
  });

  it( "should go to the prev block", function() {
    httpBackend.expectGET( "/api/v1/blocktype?" );
    scope.$digest();
    expect( element.scope().nextBlock ).toBeDefined();
    httpBackend.flush();
  });

  it( "should know the current Block and starts at 0", function() {
    httpBackend.expectGET( "/api/v1/blocktype?" );
    scope.$digest();
    expect( scope.isCurrentBlock( 0 ) ).toBe( true );
    httpBackend.flush();
  });

});

