describe "Integration - Directive: engoModule", ->
  scope = element = httpBackend = null

  beforeEach module "engoPupil",
                    "/views/directives/engoModule.html",
                    "/views/blocks/engoBlockUndefined.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.module = { blocks: [ {}, {}, {} ] }

    element = angular.element "<engo-module></engo-module>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "should have a next block element", ->
    scope.$digest()
    expect( element.find( ".engo-module-next-block" ).length ).toBe 1

  it "should have a prev block element", ->
    scope.$digest()
    expect( element.find( ".engo-module-prev-block" ).length ).toBe 1

  #it "", ->
    #httpBackend.expectGET "/api/v1/blocktype?"
    #scope.$digest()
    #httpBackend.flush()

