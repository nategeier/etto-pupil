describe "Integration - Directive: ettoCourseNav", ->
  scope = element = httpBackend = null

  beforeEach module "ettoPupil",
                    "/views/directives/ettoCourse.html",
                    "/views/course/ettoCourseNav.html",
                    "/views/blocks/ettoBlockUndefined.html",
                    "/views/blocks/ettoBlockFinished.html",
                    "/views/course/ettoSound.html"

  beforeEach inject ( $rootScope, $compile, $httpBackend ) ->
    scope = $rootScope.$new()
    scope.course = { blocks: [ {}, {}, {} ] }

    element = angular.element "<etto-course-nav></etto-course-nav>"
    element = $compile( element ) scope

    httpBackend = $httpBackend

  afterEach ->
    httpBackend.verifyNoOutstandingExpectation
    httpBackend.verifyNoOutstandingRequest

  it "should have a next block element", ->
    scope.$digest()
    expect( element.find( ".etto-course-next-block" ).length ).toBe 1

  it "should have a prev block element", ->
    scope.$digest()
    expect( element.find( ".etto-course-prev-block" ).length ).toBe 1

  #it "", ->
    #httpBackend.expectGET "/api/v1/blocktype?"
    #scope.$digest()
    #httpBackend.flush()

