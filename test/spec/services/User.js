"use strict";

describe( "Service: User", function() {
  var User;

  beforeEach(module("engoPupil"));
  beforeEach( inject(function( _User_ ) {
    User = _User_;
  }));

  it("should do something", function() {
    expect(!!User).toBe(true);
  });

});
