"use strict";

describe("Service: ModuleData", function () {

  // load the service's module
  beforeEach(module("engoPupil"));

  // instantiate service
  var ModuleData;
  beforeEach(inject(function(_ModuleData_) {
    ModuleData = _ModuleData_;
  }));

  it("should do something", function () {
    expect(!!ModuleData).toBe(true);
  });

});
