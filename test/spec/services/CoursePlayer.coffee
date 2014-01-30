describe "Service: CoursePlayer", ->
  CoursePlayer = null
  testCourse = null

  beforeEach module "ettoPupil"
  beforeEach inject ( _CoursePlayer_ ) ->
    CoursePlayer = _CoursePlayer_
    # Mock out a three block module and "play" it
    testCourse =
      blocks: [
        { type: "title", data: {} },
        { type: "text", data: {} },
        { type: "quote", data: {} } ]
    CoursePlayer.play testCourse

  it "should start on the first Block", ->
    expect( CoursePlayer.currentBlock() ).toBe 0

  it "should know how many blocks are in the Course", ->
    expect( CoursePlayer.blocksInCourse() ).toBe 3

  it "should know if the current Block is the last Block", ->
    expect( CoursePlayer.onLastBlock() ).toBe false
    CoursePlayer.nextBlock() # Block 2
    CoursePlayer.nextBlock() # Block 3, last block
    expect( CoursePlayer.onLastBlock() ).toBe true
    CoursePlayer.nextBlock() # Only 3, should still be on last block
    expect( CoursePlayer.onLastBlock() ).toBe true

  it "should know if a Block is the current Block", ->
    expect( CoursePlayer.isCurrentBlock( 0 ) ).toBe true
    CoursePlayer.nextBlock()
    expect( CoursePlayer.isCurrentBlock( 0 ) ).toBe false
    expect( CoursePlayer.isCurrentBlock( 1 ) ).toBe true

  it "should go to the next Block", ->
    CoursePlayer.nextBlock()
    expect( CoursePlayer.currentBlock() ).toBe 1

  it "should go to the previous Block", ->
    CoursePlayer.nextBlock()
    CoursePlayer.prevBlock()
    expect( CoursePlayer.currentBlock() ).toBe 0

  it "should go to a specific Block", ->
    CoursePlayer.switchToBlock(2)
    expect( CoursePlayer.currentBlock() ).toBe 2

  it "should only go to a specific Block if available, otherwise return -1", ->
    returnVal = CoursePlayer.switchToBlock(3)
    expect( CoursePlayer.currentBlock() ).toBe 0
    expect( returnVal ).toBe -1

  it "shouldn't allow going back when on the first Block", ->
    CoursePlayer.prevBlock()
    expect( CoursePlayer.currentBlock() ).toBe 0

  it "should stop advancing when the last Block is reached", ->
    CoursePlayer.nextBlock()
    CoursePlayer.nextBlock()
    CoursePlayer.nextBlock()
    expect( CoursePlayer.currentBlock() ).toBe 2

  # TODO: Write more tests for play
  describe "play functions", ->
    it "should reset to the first block", ->
      CoursePlayer.nextBlock()
      CoursePlayer.play { blocks: [ {} ] }
      expect( CoursePlayer.currentBlock() ).toBe 0

  describe "editing functions", ->
    it "should be able to add a new block to the end of a course and return its index", ->
      returnVal = CoursePlayer.addBlock('text')
      expect( CoursePlayer.blocksInCourse() ).toBe 4
      expect( returnVal ).toBe 3

    it "should be able to add a new block at the provided index", ->
      returnVal = CoursePlayer.addBlock('text', 1)
      expect( CoursePlayer.blocksInCourse() ).toBe 4
      expect( returnVal ).toBe 1

    it "should be able to remove a block and return how many are left", ->
      returnVal = CoursePlayer.removeBlock(1)
      expect( CoursePlayer.blocksInCourse() ).toBe 2
      expect( returnVal ).toBe 2
      expect( testCourse ).toEqual
        blocks: [ { type: "title", data: {} }, { type: "quote", data: {} } ]
