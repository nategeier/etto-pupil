describe "Service: CoursePlayer", ->
  CoursePlayer = null

  beforeEach module "engoPupil"
  beforeEach inject ( _CoursePlayer_ ) ->
    CoursePlayer = _CoursePlayer_
    # Mock out a three block module
    CoursePlayer.play {
      blocks: [
        { },
        { },
        { }
      ]
    }

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

  it "shouldn't allow going back when on the first Block", ->
    CoursePlayer.prevBlock()
    expect( CoursePlayer.currentBlock() ).toBe 0

  it "should stop advancing when the last Block is reached", ->
    CoursePlayer.nextBlock()
    CoursePlayer.nextBlock()
    CoursePlayer.nextBlock()
    expect( CoursePlayer.currentBlock() ).toBe 2

