describe "Directive: ettoModule", ->
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

  it "should know if it is in edit mode or not", ->
    scope.$digest()
    expect( element.scope().editing ).toBeDefined
    expect( element.scope().editing ).toBe( false )

  it "should know there are three blocks in the mock module", ->
    scope.$digest()
    expect( element.scope().module.blocks.length ).toBe( 3 )

  it "should go to the next block", ->
    scope.$digest()
    expect( element.scope().nextBlock ).toBeDefined()

  it "should go to the prev block", ->
    scope.$digest()
    expect( element.scope().prevBlock ).toBeDefined()

  it "should know the current Block and starts at 0", ->
    scope.$digest()
    expect( scope.isCurrentBlock( 0 ) ).toBe true

