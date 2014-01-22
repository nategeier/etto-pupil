describe "Directive: ettoTierTree", ->
  scope = element = httpBackend = null

  beforeEach module "ettoPupil",
                    "/views/directives/ettoTierTree.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    

    element = angular.element "<etto-tier-tree></etto-tier-tree>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  ###
  it "should know if it is in edit mode or not", ->
    scope.$digest()
    expect( element.scope().nextBlock() ).toBe( 1 )

  

  it "should know there are three blocks in the mock course", ->
    scope.$digest()
    expect( element.scope().course.blocks.length ).toBe( 3 )

  it "should go to the next block", ->
    scope.$digest()
    expect( element.scope().nextBlock ).toBeDefined()

  it "should go to the prev block", ->
    scope.$digest()
    expect( element.scope().prevBlock ).toBeDefined()

  it "should know the current Block and starts at 0", ->
    scope.$digest()
    expect( scope.isCurrentBlock( 0 ) ).toBe true
  ###