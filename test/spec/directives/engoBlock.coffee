describe "Directive: engoBlock", ->
  scope = element = httpBackend = null

  beforeEach module "engoPupil",
                    "views/blocks/engoBlockText.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.block = { type: "text", data: { text: "Test" } }

    element = angular.element "<engo-block></engo-block>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "set blockTemplate properly", ->
    scope.$digest()
    expect( element.scope().blockTemplate ).toBe "views/blocks/engoBlockText.html"
