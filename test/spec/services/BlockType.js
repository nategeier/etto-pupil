"use strict";

describe("Service: BlockType", function () {

  // load the service's module
  beforeEach(module("engoPupil"));

  // instantiate service
  var BlockType;
  beforeEach(inject(function (_BlockType_) {
    BlockType = _BlockType_;
  }));

  it("should do something", function () {
    expect(!!BlockType).toBe(true);
  });

});
