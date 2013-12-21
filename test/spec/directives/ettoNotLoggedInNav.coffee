describe "Directive: notLoggedInNav", ->
  element = scope = null

  beforeEach module "ettoPupil", "/views/directives/ettoNotLoggedInNav.html"
  beforeEach inject ( $rootScope, $compile ) ->
    scope = $rootScope.$new()

    element = angular.element "<etto-not-logged-in-nav></etto-not-logged-in-nav>"
    element = $compile( element ) scope

  it "should make hidden element visible", ->
    scope.$digest()
    expect( element.text() ).toBe "Toggle navigationLogin"

