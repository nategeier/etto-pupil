"use strict";

describe( "Service: Module", function() {
  var Module;

  // load the service's module
  beforeEach( module( "engoPupil" ) );

  // instantiate service
  beforeEach( inject( function( _Module_ ) {
    Module = _Module_;
  }));

  it( "should do something", function() {
    expect( !!Module ).toBe( true );
  });

});
