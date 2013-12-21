describe "Directive: ettoBlock", ->
  scope = element = httpBackend = null

  beforeEach module "ettoPupil",
                    "/views/blocks/ettoBlockText.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.block = { type: "text", data: { text: "Test" } }

    element = angular.element "<etto-block></etto-block>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "set blockTemplate properly", ->
    scope.$digest()
    expect( element.scope().blockTemplate ).toBe "/views/blocks/ettoBlockText.html"
