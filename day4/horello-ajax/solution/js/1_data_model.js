"use strict";

window.horello = {};

// PART 1. Data model

// Phase 1. `Card` Class
// Cards contain a unique ID, a title, and a description.  Write a Card class
// that follows the spec described in `classSpec.png`. This class will contain
// several properties and methods.

horello.Card = function(id, title, desc, listId) {
  // YOUR CODE HERE
  this.id = id;
  this.listId = listId;
  this.title = title;
  this.desc = desc;
};

horello.Card.prototype = {
  // Exercise 1.A `getId`
  // Write a getter function for the `id` property
  getId: function() {
    return this.id;
  },

  // Exercise 1.B `getTitle`
  // Write a getter function for the `title` property
  getTitle: function() {
    return this.title;
  },

  // Exercise 1.C `setTitle(titleStr<String>)`
  // Write a setter funtion for the `titleStr` property
  // 
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setTitle("Buy Milk");
  //   card.getTitle() -> "Buy Milk";
  setTitle: function(titleStr) {
    this.title = titleStr;
  },

  // Exercise 1.D `getDescription`
  // Write a getter function for the `desc` property
  getDescription: function() {
    return this.desc;
  },

  // Exercise 1.E `setDescription(desc<String>)`
  // Write a setter funtion for the `desc` property
  //
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setDescription("Maybe check Whole Foods?");
  //   card.getDescription() -> "BMaybe check Whole Foods?;
  setDescription: function(desc) {
    this.desc = desc;
  }
};

// Phase 2. `List` Class
// Lists contain a unique ID, a title, and a list of cards.  Write a List class
// according to the spec in `classSpec.png`.
horello.List = function(id, name) {
  // YOUR CODE HERE
  this.id = id;
  this.name = name;
  this.cards = [];
};

horello.List.prototype = {
  // Exercise 2.A `getId`
  // Write a getter function for the `id` property
  getId: function() {
    return this.id;
  },

  // YOUR CODE HERE
  // Exercise 2.B `getName`
  // Write a getter function for the `name` property
  getName: function() {
    return this.name;
  },

  // Exercise 2.C `setName(name<String>)`
  // Write a setter funtion for the `name` property
  // 
  // ex. var l = horello.List("Pokemon");
  //   l.setTitle("Digimon");
  //   l.getTitle() -> "Digimon";
  setName: function(name) {
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
    var card = new horello.Card(name, desc, this.getId());
    this.cards.push(card);
    return card.getId();
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
    var card = this.cards.filter(function(c) {
      return (c.getId() == cardId);
    });
    if (card.length > 0) {
      return card[0];
    }
    return null;
  },
  
  // Exercise 2.F `rmvCard(cardId<String>)`
  // Write a function that takes one argument, `cardId`, which is a
  // string. It should retrieve the cardObject which corresponds to that
  // cardId (if it exists), remove it from the card array, and return
  // it. If it does not exist, then it should return null. Finally, it
  // should return the id of the newly created card.
  rmvCard: function(cardId) {
    var c = this.getCard(cardId);
    if (c === null) {
      return null;
    }
    var ind = this.cards.indexOf(c);
    this.cards.splice(ind, 1);
    return c;
  }
};

// Phase 3. `Board` Class
// A board contains a list of lists.  Write a Board class according to the spec
// in `classSpec.png`.
horello.Board = function (id, name) {
  this.id = id;
  this.name = name;
  this.lists = [];
};

horello.Board.prototype = {
  // Exercise 3.A `addList(listName<String>)`
  // Write a function that takes one argument, `listName`, which is a
  // string. It should create a new list with this name, and add it to
  // the list of this Board's lists. Finally, it should return the ID
  // of the new list.
  addList: function(listName) {
    var list = new horello.List(listName);
    this.lists.push(list);
    return list.getId();
  },

  // Exercise 3.B `getList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and return the matching list if one is found, or undef
  // otherwise.
  getList: function(listId) {
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

horello.Board.download = function(id) {
  Trello.rest('GET', '/boards/' + id, function (data) {
    console.log("Successfully got board: " + JSON.stringify(data));
    horello.Board.fromJSON(data, function (board) {
      console.log("Successfully loaded all board data for board " + id);
      horello.mount(board);
      horello.mountStatic(board);
    });
  }, function (err) {
    console.log("Error: " + JSON.stringify(err));
  });
};

horello.Board.fromJSON = function(data, cb) {
  var board = new horello.Board(data.id, data.name);
  Trello.rest(
    "GET",
    "/boards/" + data.id + "/lists",
    function (data2) {
      console.log("Successfully loaded lists for board " + data.id);
      board.lists = data2.map(horello.List.fromJSON);
      cb(board);
    },
    function (err) {
      console.error("Error loading lists for board " + data.id + ": " + JSON.stringify(err));
    }
  );
};


horello.List.fromJSON = function(data) {
  var list = new horello.List(data.id, data.name);
}

  Trello.rest(
    "GET",
    "/boards/" + data.id + "/cards",
    function (data2) {
      console.log("Successfully loaded cards for board " + data.id);
      board.lists = data2.map(horello.Card.fromJSON);
      cb(board);
    }, function (err) {
      console.error("Error loading cards for board " + data.id + ": " + JSON.stringify(err));
    }
  );
};

horello.Card.fromJSON = function(data) {
  var card = new horello.Card(data.id, data.name, data.desc, data.idList);
  return card;
};
