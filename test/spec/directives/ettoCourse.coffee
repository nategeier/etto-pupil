describe "Directive: ettoCourse", ->
  scope = element = httpBackend = null

  beforeEach module "ettoPupil",
                    "/views/directives/ettoCourse.html",
                    "/views/blocks/ettoBlockUndefined.html",
                    "/views/blocks/ettoBlockTitle.html",
                    "/views/blocks/ettoBlockQuiz.html",
                    "/views/blocks/ettoBlockQuote.html",
                    "/views/blocks/ettoBlockFinished.html",
                    "/views/blocks/ettoBlockMap.html",
                    "/views/course/ettoSound.html",
                    "/views/blocks/ettoBlockCode.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend, Endpoint ) ->
    scope = $rootScope.$new()
    scope.course =
      blocks: [
        { type: "title", data: {} },
        { type: "quiz", data: {} },
        { type: "quote", data: {} } ]
    element = angular.element "<etto-course></etto-course>"
    element = $compile( element ) scope

    httpBackend = $httpBackend
    httpBackend.whenGET(Endpoint("auth/getSession")).respond {}

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "should know if it is in edit mode or not", ->
    scope.$digest()
    expect( element.scope().editing ).toBeDefined
    expect( element.scope().editing ).toBe( false )

  it "should know there are three blocks in the mock course", ->
    scope.$digest()
    expect( element.scope().course.blocks.length ).toBe( 4 )

  it "should go to the next block", ->
    scope.$digest()
    expect( element.scope().nextBlock ).toBeDefined()

  it "should go to the prev block", ->
    scope.$digest()
    expect( element.scope().prevBlock ).toBeDefined()

  it "should know the current Block and starts at 0", ->
    scope.$digest()
    expect( scope.isCurrentBlock( 0 ) ).toBe true

  it "should be able to swap two Blocks", ->
    scope.$digest()
    expect( scope.swapBlocks ).toBeDefined()
    scope.swapBlocks(1, 2)
    expect( scope.course.blocks[1].type ).toEqual "quote"
    expect( scope.course.blocks[2].type ).toEqual "quiz"
