describe "Directive: ettoBlock", ->
  scope = element = httpBackend = null

  beforeEach module "ettoPupil",
                    "/views/blocks/ettoBlockQuiz.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.block = { type: "quiz", data: { text: "Test" } }

    element = angular.element "<etto-block></etto-block>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "set blockTemplate properly", ->
    scope.$digest()
    expect( element.scope().blockTemplate ).toBe "/views/blocks/ettoBlockQuiz.html"
