'use strict';

describe('Service: Home', function () {

  // load the service's module
  beforeEach(module('enrollgoComposerApp'));

  // instantiate service
  var Home;
  beforeEach(inject(function (_Home_) {
    Home = _Home_;
  }));

  it('should do something', function () {
    expect(!!Home).toBe(true);
  });

});
