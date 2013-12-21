"use strict";

describe("Directive: enrollgoBlock", function() {
  var element, scope, $httpBackend;

  // load the directive's module
  beforeEach( module( "ettoPupil" ) );

  //beforeEach( inject( function( $rootScope, $compile, $injector ) {
    //$httpBackend = $injector.get( "$httpBackend" );
    //$httpBackend.when( "GET", "/api/v1/blocktype?type=text" ).respond({
      //type: "text",
      //template: "<p>{{ block.data.text }}</p>",
      //id: "test"
    //});

    //scope = $rootScope;

    //element = angular.element( "<etto-block block='{ type: \"text\", data: { text: \"etto!\" } }'></etto-block>" );
    //element = $compile( element )( scope );
  //}));

  beforeEach( function() {
  });

  afterEach( function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  //it( "should know if it is in edit mode or not", inject( function( $compile ) {
    //$httpBackend.expectGET( "/api/v1/blocktype?type=text" );
    //$httpBackend.flush();
    //expect( element.scope().editing ).toBeDefined();
  //}));
});

