"use strict";

var htmlRX = /<(\w+)/g;

describe("<Card> Class", function() {
  var card;
  beforeAll(function() {
    card = new horello.Card("Lean Startup", "Eric Ries, Agile Dev, Venture Capital");
  });
  
  describe("the render method", function() {
    it("should exist", function() {
      expect(card.render).toBeDefined();
    });
    
    it("should return a string", function() {
      expect(card.render()).toEqual(jasmine.any(String));
    });
    
    it("should return valid HTML", function() {
      expect(card.render().search(htmlRX)).not.toEqual(-1);
    });
  });
});

describe("<List> Class", function() {
  var list;
  beforeAll(function() {
    list = new horello.List("Horizon Concepts");
  });
  
  describe("the render method", function() {
    it("should exist", function() {
      expect(list.render).toBeDefined();
    });
    
    it("should return a string", function() {
      expect(list.render()).toEqual(jasmine.any(String));
    });
    
    it("should return valid HTML", function() {
      expect(list.render().search(htmlRX)).not.toEqual(-1);
    });
  });
});

describe("<Board> Class", function() {
  var board;
  beforeAll(function() {
    board = new horello.Board();
  });

  describe("the render method", function() {
    it("should exist", function() {
      expect(board.render).toBeDefined();
    });
  });
});
