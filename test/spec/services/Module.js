"use strict";

describe( "Service: ModuleLoader", function() {
  var mockBackend, loader, location;

  // load the service's module
  beforeEach( module( "engoPupil" ) );

  // instantiate service
  beforeEach( inject( function( _$httpBackend_, Module, ModuleLoader, _$route_, $location ) {
    mockBackend = _$httpBackend_;
    mockBackend.whenGET( "views/ModuleView.html" );

    loader = ModuleLoader;

    _$route_.current = {
      params: {
        moduleId: "527ac7a09f2b97d313000004"
      }
    };

  }));

  //it( "should load a module", function() {
    //mockBackend.expectGET( "/api/v1/module?id=527ac7a09f2b97d313000004" ).respond({ id: 123 });

    //var module;

    //var promise = loader();
    //promise.then( function( m ) {
      //module = m;
    //});

    //mockBackend.flush();

    //expect( module ).toEqual({ id: 123 });
  //});

});
