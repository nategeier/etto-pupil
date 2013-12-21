describe "Directive: notLoggedInNav", ->
  element = scope = null

  beforeEach module "engoPupil", "/views/directives/engoNotLoggedInNav.html"
  beforeEach inject ( $rootScope, $compile ) ->
    scope = $rootScope.$new()

    element = angular.element "<engo-not-logged-in-nav></engo-not-logged-in-nav>"
    element = $compile( element ) scope

  it "should make hidden element visible", ->
    scope.$digest()
    expect( element.text() ).toBe "Toggle navigationLogin"

