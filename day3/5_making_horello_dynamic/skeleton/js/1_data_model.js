"use strict";

window.horello = {};

// [Helper] `generateId`
// This function generates a random, unique string for you use for whatever.
//
// ex. horello.generateId() -> 'aQ-V-c-u-P4l'
// ex. horello.generateId() -> 'bh-H-N-9-Vdr'
horello.generateId = function() {
  var chunk = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};

// PART 1. Data model

// Phase 1. `Card` Class
// Cards contain a unique ID, a title, and a description.  Write a Card class
// that follows the spec described in `classSpec.png`. This class will contain
// several properties and methods.

horello.Card = function(title, desc, listId) {
  this.id = horello.generateId();
  this.listId = listId;
  this.title = title;
  this.desc = desc;
};

horello.Card.prototype = {
  // Exercise 1.A `getId`
  // Write a getter function for the `id` property
  getId: function() {
    // YOUR CODE HERE
    return this.id;
  },

  // Exercise 1.B `getTitle`
  // Write a getter function for the `title` property
  getTitle: function() {
    // YOUR CODE HERE
    return this.title;
  },

  // Exercise 1.C `setTitle(titleStr<String>)`
  // Write a setter funtion for the `titleStr` property
  //
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setTitle("Buy Milk");
  //   card.getTitle() -> "Buy Milk";
  setTitle: function(titleStr) {
    // YOUR CODE HERE
    this.title = titleStr;
  },

  // Exercise 1.D `getDescription`
  // Write a getter function for the `desc` property
  getDescription: function() {
    // YOUR CODE HERE
    return this.desc;
  },

  // Exercise 1.E `setDescription(desc<String>)`
  // Write a setter funtion for the `desc` property
  //
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setDescription("Maybe check Whole Foods?");
  //   card.getDescription() -> "BMaybe check Whole Foods?;
  setDescription: function(desc) {
    // YOUR CODE HERE
    this.desc = desc;
  }
};

// Phase 2. `List` Class
// Lists contain a unique ID, a title, and a list of cards.  Write a List class
// according to the spec in `classSpec.png`.
horello.List = function(name) {
  // YOUR CODE HERE
  this.name = name;
  this.id = horello.generateId();
  this.cards = [];
};

horello.List.prototype = {
  // Exercise 2.A `getId`
  // Write a getter function for the `id` property
  getId: function() {
    // YOUR CODE HERE
    return this.id;

  },

  // YOUR CODE HERE
  // Exercise 2.B `getName`
  // Write a getter function for the `name` property
  getName: function() {
    // YOUR CODE HERE
    return this.name;
  },

  // Exercise 2.C `setName(name<String>)`
  // Write a setter funtion for the `name` property
  //
  // ex. var l = horello.List("Pokemon");
  //   l.setTitle("Digimon");
  //   l.getTitle() -> "Digimon";
  setName: function(name) {
    // YOUR CODE HERE
    this.name = name;
  },

  // Exercise 2.D `addCard(title<String>, desc<String>)`
  // Write a function that takes two arguments, `title` and `desc`,
  // which are both strings. It should instantiate a new Card object
  // with those give arguments, and add the newly created object to its
  // array of cards. Finally, it should return the id of the newly
  // created card.
  //
  // hint. You can create a card using new horello.Card(...)
  addCard: function(name, desc) {
    // YOUR CODE HERE
    var id = this.getId();
    var newCard = new horello.Card(name, desc, id);
    this.cards.push(newCard);
    return newCard.getId();
  },

  // Exercise 2.E `getCard(cardId<String>)`
  // Write a function that takes one argument, `cardId`, which is a
  // string. It should search its card array for the Card object with
  // the given id, and return it. If the card cannot be found, it should
  // return null.
  //
  // ex. var l = horello.List("Superheroes");
  //   var cId = l.addCard("Miss Marvel", "Carol Danvers");
  //   l.getCard(cId) ->
  //   l.getTitle() -> "Digimon";
  //
  // hint. you can use anything of wha you've learned before!
  getCard: function(cardId) {
    // YOUR CODE HERE
    var found = false;
    for (var i = 0; i < this.cards.length; i ++) {
              console.log(this.cards[i]);
      if (this.cards[i].getId()===cardId) {
        found = true;
        return this.cards[i];
      }
    }
    if (found === false) {
      return null;
    }
  },

  // Exercise 2.F `rmvCard(cardId<String>)`
  // Write a function that takes one argument, `cardId`, which is a
  // string. It should retrieve the cardObject which corresponds to that
  // cardId (if it exists), remove it from the card array, and return
  // it. If it does not exist, then it should return null.
  rmvCard: function(cardId) {
    // YOUR CODE HERE
    var removed = false;
    for (var i = 0; i < this.cards.length; i ++) {
      if (this.cards[i].getId()===cardId) {
        removed = true;
        return this.cards.pop(this.cards[i]);
      }
    }
    if (removed === false) {
      return null;
    }
  }
};

// Phase 3. `Board` Class
// A board contains a list of lists.  Write a Board class according to the spec
// in `classSpec.png`.
horello.Board = function () {
  // YOUR CODE HERE
  this.lists = [];
};

horello.Board.prototype = {
  // Exercise 3.A `addList(listName<String>)`
  // Write a function that takes one argument, `listName`, which is a
  // string. It should create a new list with this name, and add it to
  // the list of this Board's lists. Finally, it should return the ID
  // of the new list.
  addList: function(listName) {
    // YOUR CODE HERE
    var newList = new horello.List(listName);
    this.lists.push(newList);
    return newList.id;
  },

  // Exercise 3.B `getList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and return the matching list if one is found, or undef
  // otherwise.
  getList: function(listId) {
    // YOUR CODE HERE
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });

  },

  // Exercise 3.C `rmvList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and if one is found, it should delete this list from the
  // Board's lists, then return the list object. If no matching list is
  // found, it should return null.
  rmvList: function(listId) {
    var c = this.getList(listId);
    if (c === null) {
      return null;
    }
    var ind = this.lists.indexOf(c);
    this.lists.splice(ind, 1);
    return c;
  }
};
