"use strict";

describe("<Card> Class", function() {
  var card;
  beforeAll(function() {
    card = new horello.Card("Lean Startup", "Eric Ries, Agile Dev, Venture Capital");
  });
  
  describe("the id property", function() {
    it("should exist with a getter", function() {
      expect(card.id).toBeDefined();
      expect(card.getId).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(card.id).toEqual(jasmine.any(String));
      expect(card.getId()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(card.getId()).toBe(card.id);
    });
    
    it("should be a unique property", function() {
      var n = 100;
      while (n != 0) {
        expect((new horello.Card("", "")).getId()).not.toBe((new horello.Card("", "")).getId());
        n -= 1;
      }
    });
  });
  
  describe("the title property", function() {
    it("should exist with a getter and setter", function() {
      expect(card.title).toBeDefined();
      expect(card.getTitle).toBeDefined();
      expect(card.setTitle).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(card.title).toEqual(jasmine.any(String));
      expect(card.getTitle()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(card.getTitle()).toBe(card.title);
    });
    
    it("should be settable", function() {
      card.setTitle("Flame");
      expect(card.getTitle()).toBe("Flame");
      expect(card.title).toBe("Flame");
    });
  });
  
  describe("the desc property", function() {
    it("should exist with a getter and setter", function() {
      expect(card.desc).toBeDefined();
      expect(card.getDescription).toBeDefined();
      expect(card.setDescription).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(card.desc).toEqual(jasmine.any(String));
      expect(card.getDescription()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(card.getDescription()).toBe(card.desc);
    });
    
    it("should reflect the same value that was given upon instantiation", function() {
      expect(card.getDescription()).toBe("Eric Ries, Agile Dev, Venture Capital");
      expect(card.desc).toBe("Eric Ries, Agile Dev, Venture Capital");
    });
    
    it("should be settable", function() {
      card.setDescription("Johnny Storm");
      expect(card.getDescription()).toBe("Johnny Storm");
      expect(card.desc).toBe("Johnny Storm");
    });
  });
});

describe("<List> Class", function() {
  var list;
  beforeAll(function() {
    list = new horello.List("Horizon Concepts");
  });
  
  describe("the name property", function() {
    it("should exist with a getter and setter", function() {
      expect(list.name).toBeDefined();
      expect(list.getName).toBeDefined();
      expect(list.setName).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(list.name).toEqual(jasmine.any(String));
      expect(list.getName()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(list.getName()).toBe(list.name);
    });
    
    it("should be settable", function() {
      list.setName("Flame");
      expect(list.getName()).toBe("Flame");
      expect(list.name).toBe("Flame");
    });
  });
  
  describe("the cards property", function() {
    it("should exist", function() {
      expect(list.cards).toBeDefined();
    });
    
    it("should be an array", function() {
      expect(list.cards).toEqual(jasmine.any(Array));
    });
    
    it("should be empty upon instantiation", function() {
      expect((new horello.List("")).cards.length).toBe(0);
    });
  });
  
  describe("the addCard method", function() {
    
    it("should exist", function() {
      expect(list.addCard).toBeDefined();
    });
    
    it("should add a card", function() {
      expect(list.cards.length).toBe(0);
      var cardId = list.addCard("Thing", "Other");
      expect(list.cards.length).toBe(1);
      expect(list.cards[0]).toEqual(jasmine.any(horello.Card));
    });
    
  });
  
  describe("the getCard method", function() {
    it("should exist", function() {
      expect(list.getCard).toBeDefined();
    });
    
    it("should get a card", function() {
      var cardId = list.addCard("Thing", "Other");
      expect(list.cards.length).toBe(2);
      expect(list.getCard(cardId)).toEqual(jasmine.any(horello.Card));
      expect(list.getCard(cardId).getTitle()).toBe("Thing");
      expect(list.cards.length).toBe(2);
    });
  });
  
  describe("the rmvCard method", function() {
    it("should exist", function() {
      expect(list.rmvCard).toBeDefined();
    });
    
    it("should remove and return a card", function() {
      var cardId = list.addCard("Thing", "Other");
      expect(list.cards.length).toBe(3);
      expect(list.rmvCard(cardId)).toEqual(jasmine.any(horello.Card));
      expect(list.cards.length).toBe(2);
    });
  });
});

describe("<Board> Class", function() {
  var board;
  beforeAll(function() {
    board = new horello.Board();
  });

  describe("the lists property", function() {
    it("should exist", function() {
      expect(board.lists).toBeDefined();
    });

    it("should be an array", function() {
      expect(board.lists).toEqual(jasmine.any(Array));
    });

    it("should be empty upon instantiation", function() {
      expect((new horello.Board()).lists.length).toBe(0);
    });
  });

  describe("the addList method", function() {

    it("should exist", function() {
      expect(board.addList).toBeDefined();
    });

    it("should add a list", function() {
      expect(board.lists.length).toBe(0);
      var listId = board.addList("Thing");
      expect(board.lists.length).toBe(1);
      expect(board.lists[0]).toEqual(jasmine.any(horello.List));
    });
  });
});
