"use strict";

var htmlRX = /<(\w+)/g;

describe("<Note> Class", function() {
  var note;
  beforeAll(function() {
    note = new horello.Note("Lean Startup", "Eric Ries, Agile Dev, Venture Capital");
  });
  
  describe("the id property", function() {
    it("should exist with a getter", function() {
      expect(note.id).toBeDefined();
      expect(note.getId).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(note.id).toEqual(jasmine.any(String));
      expect(note.getId()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(note.getId()).toBe(note.id);
    });
    
    it("should be a unique property", function() {
      var n = 100;
      while (n != 0) {
        expect((new horello.Note("", "")).getId()).not.toBe((new horello.Note("", "")).getId());
        n -= 1;
      }
    });
  });
  
  describe("the title property", function() {
    it("should exist with a getter and setter", function() {
      expect(note.title).toBeDefined();
      expect(note.getTitle).toBeDefined();
      expect(note.setTitle).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(note.title).toEqual(jasmine.any(String));
      expect(note.getTitle()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(note.getTitle()).toBe(note.title);
    });
    
    it("should be settable", function() {
      note.setTitle("Flame");
      expect(note.getTitle()).toBe("Flame");
      expect(note.title).toBe("Flame");
    });
  });
  
  describe("the desc property", function() {
    it("should exist with a getter and setter", function() {
      expect(note.desc).toBeDefined();
      expect(note.getDescription).toBeDefined();
      expect(note.setDescription).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(note.desc).toEqual(jasmine.any(String));
      expect(note.getDescription()).toEqual(jasmine.any(String));
    });
    
    it("should return the same thing as the getter", function() {
      expect(note.getDescription()).toBe(note.desc);
    });
    
    it("should reflect the same value that was given upon instantiation", function() {
      expect(note.getDescription()).toBe("Eric Ries, Agile Dev, Venture Capital");
      expect(note.desc).toBe("Eric Ries, Agile Dev, Venture Capital");
    });
    
    it("should be settable", function() {
      note.setDescription("Johnny Storm");
      expect(note.getDescription()).toBe("Johnny Storm");
      expect(note.desc).toBe("Johnny Storm");
    });
  });
  
  describe("the createdAt property", function() {
    it("should exist", function() {
      expect(note.createdAt).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(note.createdAt).toEqual(jasmine.any(String));
    });
  });
  
  describe("the updatedAt property", function() {
    it("should exist", function() {
      expect(note.updatedAt).toBeDefined();
    });
    
    it("should be a string", function() {
      expect(note.updatedAt).toEqual(jasmine.any(String));
    });
  });
  
  describe("the render method", function() {
    it("should exist", function() {
      expect(note.render).toBeDefined();
    });
    
    it("should return a string", function() {
      expect(note.render()).toEqual(jasmine.any(String));
    });
    
    it("should return valid HTML", function() {
      expect(note.render().search(htmlRX)).not.toEqual(-1);
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
      expect(list.cards[0]).toEqual(jasmine.any(horello.Note));
    });
    
  });
  
  describe("the getCard method", function() {
    it("should exist", function() {
      expect(list.getCard).toBeDefined();
    });
    
    it("should get a card", function() {
      var cardId = list.addCard("Thing", "Other");
      expect(list.cards.length).toBe(2);
      expect(list.getCard(cardId)).toEqual(jasmine.any(horello.Note));
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
      expect(list.rmvCard(cardId)).toEqual(jasmine.any(horello.Note));
      expect(list.cards.length).toBe(2);
    });
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
