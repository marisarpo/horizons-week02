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
<<<<<<< HEAD
<<<<<<< HEAD
    return this.id
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 1.B `getTitle`
  // Write a getter function for the `title` property
  getTitle: function() {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.title
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 1.C `setTitle(titleStr<String>)`
  // Write a setter funtion for the `titleStr` property
  // 
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setTitle("Buy Milk");
  //   card.getTitle() -> "Buy Milk";
  setTitle: function(titleStr) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.title = titleStr
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 1.D `getDescription`
  // Write a getter function for the `desc` property
  getDescription: function() {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.desc
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 1.E `setDescription(desc<String>)`
  // Write a setter funtion for the `desc` property
  //
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setDescription("Maybe check Whole Foods?");
  //   card.getDescription() -> "BMaybe check Whole Foods?;
  setDescription: function(desc) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.desc = desc
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  }
};

// Phase 2. `List` Class
// Lists contain a unique ID, a title, and a list of cards.  Write a List class
// according to the spec in `classSpec.png`.
horello.List = function(name) {
<<<<<<< HEAD
<<<<<<< HEAD
  this.name = name;
  this.id = horello.generateId();
  this.cards = []   //why empty array
=======
  // YOUR CODE HERE
>>>>>>> master
=======
  // YOUR CODE HERE
>>>>>>> master
};

horello.List.prototype = {
  // Exercise 2.A `getId`
  // Write a getter function for the `id` property
  getId: function() {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.id;
  },


=======
    // YOUR CODE HERE
  },

>>>>>>> master
=======
    // YOUR CODE HERE
  },

>>>>>>> master
  // YOUR CODE HERE
  // Exercise 2.B `getName`
  // Write a getter function for the `name` property
  getName: function() {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.name;
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 2.C `setName(name<String>)`
  // Write a setter funtion for the `name` property
  // 
  // ex. var l = horello.List("Pokemon");
  //   l.setTitle("Digimon");
  //   l.getTitle() -> "Digimon";
  setName: function(name) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.name = name;
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
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
<<<<<<< HEAD
<<<<<<< HEAD
   var newCard = new horello.Card(name, desc, this.getId);
   this['cards'].push(newCard); //this.cards.push(newCard)
    return newCard.getId();
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
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
<<<<<<< HEAD
<<<<<<< HEAD
    for (var i = 0; i< this.cards.length; i++){
      if (this.cards[i].id=== cardId){
        return this.cards[i];
      }
      }
      return null;
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },
  
  // Exercise 2.F `rmvCard(cardId<String>)`
  // Write a function that takes one argument, `cardId`, which is a
  // string. It should retrieve the cardObject which corresponds to that
  // cardId (if it exists), remove it from the card array, and return
  // it. If it does not exist, then it should return null. Finally, it
  // should return the id of the newly created card.
  rmvCard: function(cardId) {
<<<<<<< HEAD
<<<<<<< HEAD
       for (var i = 0; i< this.cards.length; i++){
      if (this.cards[i].id === cardId){
        var x = this.cards[i];
        this.cards.splice(i, 1);
        return x;
      }
      }
      return null;
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  }
};

// Phase 3. `Board` Class
// A board contains a list of lists.  Write a Board class according to the spec
// in `classSpec.png`.
horello.Board = function () {
<<<<<<< HEAD
<<<<<<< HEAD
  this.lists= [];
=======
  // YOUR CODE HERE
>>>>>>> master
=======
  // YOUR CODE HERE
>>>>>>> master
};

horello.Board.prototype = {
  // Exercise 3.A `addList(listName<String>)`
  // Write a function that takes one argument, `listName`, which is a
  // string. It should create a new list with this name, and add it to
  // the list of this Board's lists. Finally, it should return the ID
  // of the new list.
  addList: function(listName) {
<<<<<<< HEAD
<<<<<<< HEAD
    var newList = new horello.List(listName);
    this.lists.push(newList)
    return newList.id
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 3.B `getList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and return the matching list if one is found, or undef
  // otherwise.
  getList: function(listId) {
<<<<<<< HEAD
<<<<<<< HEAD
    for (var i=0; i<this.lists.length; i++){
      if (this.lists[i].id === listId){
        return this.lists[i];
      }
    }
    return undefined;
=======
    // YOUR CODE HERE
>>>>>>> master
=======
    // YOUR CODE HERE
>>>>>>> master
  },

  // Exercise 3.C `rmvList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and if one is found, it should delete this list from the
  // Board's lists, then return the list object. If no matching list is
  // found, it should return null.
  rmvList: function(listId) {
<<<<<<< HEAD
<<<<<<< HEAD
    for (var i=0; i<this.lists.length; i++){
      if (this.lists[i].id === listId){
        var x = this.lists[i];
          this.lists.splice(i, 1);
          return x;
      }
    }
    return undefined;
  },
=======
    // YOUR CODE HERE
  }
>>>>>>> master
=======
    // YOUR CODE HERE
  }
>>>>>>> master
};

