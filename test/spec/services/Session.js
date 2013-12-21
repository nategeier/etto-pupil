"use strict";

describe( "Service: Session", function() {
  var Session, httpBackend;

  beforeEach( module( "ettoPupil" ) );

  beforeEach( inject( function ( _Session_, _$httpBackend_ ) {
    Session = _Session_;
    httpBackend = _$httpBackend_;
  }));

  //describe( "authentication", function() {
    //it( "should POST credentials to the backend", function() {
      //httpBackend.expectPOST( "/api/v1/sessions/start_session" ).respond({
        //user: {
          //userID: 2,
          //name: "Nate Geier",
          //email: "ngeier13@gmail.com"
        //}
      //});

      ////Session.authenticate( "ngeier13@gmail.com", "green123" );

      ////httpBackend.flush();
    //});
  //});

});

