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
  },

  // Exercise 1.B `getTitle`
  // Write a getter function for the `title` property
  getTitle: function() {
    // YOUR CODE HERE
  },

  // Exercise 1.C `setTitle(titleStr<String>)`
  // Write a setter funtion for the `titleStr` property
  // 
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setTitle("Buy Milk");
  //   card.getTitle() -> "Buy Milk";
  setTitle: function(titleStr) {
    // YOUR CODE HERE
  },

  // Exercise 1.D `getDescription`
  // Write a getter function for the `desc` property
  getDescription: function() {
    // YOUR CODE HERE
  },

  // Exercise 1.E `setDescription(desc<String>)`
  // Write a setter funtion for the `desc` property
  //
  // ex. var card = horello.Card("Thing I had to do", "What was it?");
  //   card.setDescription("Maybe check Whole Foods?");
  //   card.getDescription() -> "BMaybe check Whole Foods?;
  setDescription: function(desc) {
    // YOUR CODE HERE
  }
};

// Phase 2. `List` Class
// Lists contain a unique ID, a title, and a list of cards.  Write a List class
// according to the spec in `classSpec.png`.
horello.List = function(name) {
  // YOUR CODE HERE
};

horello.List.prototype = {
  // Exercise 2.A `getId`
  // Write a getter function for the `id` property
  getId: function() {
    // YOUR CODE HERE
  },

  // YOUR CODE HERE
  // Exercise 2.B `getName`
  // Write a getter function for the `name` property
  getName: function() {
    // YOUR CODE HERE
  },

  // Exercise 2.C `setName(name<String>)`
  // Write a setter funtion for the `name` property
  // 
  // ex. var l = horello.List("Pokemon");
  //   l.setTitle("Digimon");
  //   l.getTitle() -> "Digimon";
  setName: function(name) {
    // YOUR CODE HERE
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
  },
  
  // Exercise 2.F `rmvCard(cardId<String>)`
  // Write a function that takes one argument, `cardId`, which is a
  // string. It should retrieve the cardObject which corresponds to that
  // cardId (if it exists), remove it from the card array, and return
  // it. If it does not exist, then it should return null. Finally, it
  // should return the id of the newly created card.
  rmvCard: function(cardId) {
    // YOUR CODE HERE
  }
};

// Phase 3. `Board` Class
// A board contains a list of lists.  Write a Board class according to the spec
// in `classSpec.png`.
horello.Board = function () {
  // YOUR CODE HERE
};

horello.Board.prototype = {
  // Exercise 3.A `addList(listName<String>)`
  // Write a function that takes one argument, `listName`, which is a
  // string. It should create a new list with this name, and add it to
  // the list of this Board's lists. Finally, it should return the ID
  // of the new list.
  addList: function(listName) {
    // YOUR CODE HERE
  },

  // Exercise 3.B `getList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and return the matching list if one is found, or undef
  // otherwise.
  getList: function(listId) {
    // YOUR CODE HERE
  },

  // Exercise 3.C `rmvList(listId<String>)`
  // Write a function that takes one argument, `listId`, which is a
  // string. It should look for a list with this ID among the Board's
  // lists, and if one is found, it should delete this list from the
  // Board's lists, then return the list object. If no matching list is
  // found, it should return null.
  rmvList: function(listId) {
    // YOUR CODE HERE
  }
};


// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body">'+this.title+'</div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(this.title);

  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  // YOUR CODE HERE
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
},

// PART 3. Events
//
// This function is called once, when the page loads, to set up all of
// the static events, i.e., events that do not need to change as we
// change the contents of the board. For instance, the "Add list" button
// always does the same thing. The button doesn't appear or disappear
// and its behavior never changes.
horello.mountStatic = function() {

  // Phase 1. Static events

  // Add list form: these events control the "Add a list" form that
  // appears on the top-level board.

  // 1a. [EXAMPLE] Add list form: toggle collapse
  // This event, attached to the "Add a list..." button, should cause
  // its associated form to appear and disappear.
  $('.add-list').click(function(e) {
    $('#addList').collapse('toggle');
  });

  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).
 
  // YOUR CODE HERE

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  // YOUR CODE HERE

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

  // YOUR CODE HERE
}

// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  // Phase 3. Create card

  // Unrender and re-render the board.
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());

  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form

  // YOUR CODE HERE

  // Phase 4(a). Edit card

  // YOUR CODE HERE
};
