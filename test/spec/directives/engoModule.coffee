describe "Directive: engoModule", ->
  scope = element = httpBackend = null

  beforeEach module "engoPupil", "views/directives/engoModule.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.module = { blocks: [ {}, {}, {} ] }

    element = angular.element "<engo-module></engo-module>"
    element = $compile( element ) scope

    httpBackend = $httpBackend
    httpBackend.when( "GET", "/api/v1/blocktype?" ).respond []

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "should know if it is in edit mode or not", ->
    httpBackend.expectGET( "/api/v1/blocktype?" )
    scope.$digest()
    expect( element.scope().editing ).toBeDefined
    expect( element.scope().editing ).toBe( false )
    httpBackend.flush()

  it "should know there are three blocks in the mock module", ->
    httpBackend.expectGET( "/api/v1/blocktype?" )
    scope.$digest()
    expect( element.scope().module.blocks.length ).toBe( 3 )
    httpBackend.flush()

  it "should go to the next block", ->
    httpBackend.expectGET( "/api/v1/blocktype?" )
    scope.$digest()
    expect( element.scope().nextBlock ).toBeDefined()
    httpBackend.flush()

  it "should go to the prev block", ->
    httpBackend.expectGET( "/api/v1/blocktype?" )
    scope.$digest()
    expect( element.scope().prevBlock ).toBeDefined()
    httpBackend.flush()

  it "should know the current Block and starts at 0", ->
    httpBackend.expectGET( "/api/v1/blocktype?" )
    scope.$digest()
    expect( scope.isCurrentBlock( 0 ) ).toBe true
    httpBackend.flush()

