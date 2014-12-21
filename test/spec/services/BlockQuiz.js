"use strict";

describe("Service: BlockQuiz", function () {
  var BlockQuiz,
    testQuestions;

  BlockQuiz = null;
  testQuestions = null;
  beforeEach(module("ettoPupil"));

  beforeEach(inject(function (_BlockQuiz_) {
    BlockQuiz = _BlockQuiz_;
    testQuestions = [BlockQuiz.getQuestion()];
  }));

  it("should create a question", function () {
    expect(BlockQuiz.getQuestion().question).toBe("Question");
  });

  it("should create a question", function () {
    expect(BlockQuiz.addQuestion(testQuestions)).toBe(2);
  });

  it("should delete a question", function () {
    expect(BlockQuiz.deleteQuestion(testQuestions)).toBe(0);
  });

  it("should add an answer", function () {
    expect(BlockQuiz.addAnswer(testQuestions, 0)).toBe(2);
  });

  it("should add an answer", function () {
    expect(BlockQuiz.deleteAnswer(testQuestions, 0)).toBe(0);
  });

  it("should evaluate and pass the quiz", function () {
    var evaluations = [true];
    BlockQuiz.evaluate(evaluations, testQuestions, function (passed) {
      expect(passed).toBe(true);
    });
  });

  it("should evaluate and fail the quiz", function () {
    var evaluations = [false];
    BlockQuiz.evaluate(evaluations, testQuestions, function (passed) {
      expect(passed).toBe(false);
    });
  });
});
