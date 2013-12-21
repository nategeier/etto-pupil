describe "Integration - Directive: ettoModule", ->
  scope = element = httpBackend = null

  beforeEach module "ettoPupil",
                    "/views/directives/ettoModule.html",
                    "/views/blocks/ettoBlockUndefined.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.module = { blocks: [ {}, {}, {} ] }

    element = angular.element "<etto-module></etto-module>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "should have a next block element", ->
    scope.$digest()
    expect( element.find( ".etto-module-next-block" ).length ).toBe 1

  it "should have a prev block element", ->
    scope.$digest()
    expect( element.find( ".etto-module-prev-block" ).length ).toBe 1

  #it "", ->
    #httpBackend.expectGET "/api/v1/blocktype?"
    #scope.$digest()
    #httpBackend.flush()

