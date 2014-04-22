describe "Service: Endpoint", ->
  Endpoint = null
  rootScope = null

  beforeEach module "ettoPupil"
  beforeEach inject ( _Endpoint_, _$rootScope_ ) ->
    Endpoint = _Endpoint_
    rootScope = _$rootScope_
    rootScope.config.api =
      server: "https://api.coursetto.com/"
      version: "api/v1"

  it "should create an endpoint URL for a resource", ->
    endpoint = Endpoint("resource")
    expect( endpoint ).toBe "https://api.coursetto.com/api/v1/resource"
  it "should create an endpoint URL for a resource with a method", ->
    endpoint = Endpoint("resource", "method")
    expect( endpoint ).toBe "https://api.coursetto.com/api/v1/resource/method"

  it "should create endpoint URLs for dev and production", ->
    rootScope.config.api =
      server: "/"
      version: "api/v1"
    endpoint = Endpoint("resource")
    expect( endpoint ).toBe "/api/v1/resource"
