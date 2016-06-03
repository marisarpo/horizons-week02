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
  // YOUR CODE HERE
  this.id = horello.generateId();
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
horello.List = function(name) {
  // YOUR CODE HERE
  this.id = horello.generateId();
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
horello.Board = function () {
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


// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if (this.getDescription()) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  }
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
  // Build wrappers
  var wrapper = $('<div></div>');

  var listContainer = $('<div class="list-container"></div>');
  var listWrapper = $('<div class="list" id="'+this.id+'"></div>');
  var listHeader = $('<div class="list-header"></div>');
  var listBody = $('<div class="list-cards"></div>');
  var listFooter = $('<div class="list-footer"></div>');

  wrapper.append(listContainer);
  listContainer.append(listWrapper);
  listWrapper.append(listHeader);
  listWrapper.append(listBody);
  listWrapper.append(listFooter);
  listHeader.append($('<span class="list-title"></span>').text(this.name));
  listFooter.append($('<button class="add-card" addCardId="'+this.id+'">Add a card...</button>'));
  listFooter.append($('\
      <div class="collapse" id="addCardForm'+this.id+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
      <button type="button" class="btn btn-default" id="addCardBtn'+this.id+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span>\
      </button>\
      </div>\
      </div>\
    '));

  // Build cards in the body
  listBody.html(this.cards.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.

horello.Board.prototype.render = function() {
  var wrapper = $('<div id="board" class="board"></div>');
  wrapper.html(this.lists.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper;    
},

horello.Board.prototype.renderToHTML = function() {
  return this.render().html();
}

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
  $('#addList').on('shown.bs.collapse', function (e) {
    $('#addListText').focus();
  });

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.
  $('#addListSave').click(function(e) {
    var listName = $('#addListText').val();
    // validate input
    if (!listName) {
      alert("Please enter a list name");
      return;
    }
    board.addList(listName);
    $('#addListText').val('');
    $('#addList').collapse('toggle');
    horello.mount(board);
  });

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.
  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });

  // Modal: these events control the modal that appears when you click
  // on a card.

  // 1e. Open modal
  // This event, triggered when the user clicks on a card, should reveal
  // the "Edit card" modal, populated with that card's data. It should
  // store the necessary 
  $('#cardEdit').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget);
    var cardId = button.data('card-id');
    var listId = button.data('list-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    $('#modalText').val(card.getTitle());
    $('#modalBody').val(card.getDescription());
    $('#modalSave').data('list-id', listId);
    $('#modalSave').data('card-id', cardId);
  });

  // 1f. Modal save
  $('#modalSave').click(function (e) {
    var title = $('#modalText').val();
    var desc = $('#modalBody').val();
    if (!title) {
      alert('Please enter a title');
      return;
    }

    var listId = $(e.currentTarget).data('list-id');
    var cardId = $(e.currentTarget).data('card-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    card.setTitle(title);
    card.setDescription(desc);
    $('#cardEdit').modal('hide');
    horello.mount(board);
  });
}

// Dynamic stuff, unbind and rebind every time the board is rendered.

horello.mount = function (board) {
  /*
    Note: we are NOT unbinding event listeners from elements that are
    going away. It looks like this isn't necessary with jquery per
    http://stackoverflow.com/questions/10957709/do-i-need-to-unbind-jquery-event-before-remove-element.
    However, we do remove listeners on elements that stick around so
    that we don't duplicate listeners (not 100% sure whether this is
    necessary but let's do it to be safe).
   */

  // Unrender and re-render the board.
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());

  // Re-bind add card forms.
  $('.add-card').each(function (idx) {
    $(this).off();

    var id = $(this).attr('addCardId');

    // Open add card form
    $(this).click(function (e) {
      $('#addCardForm'+id).collapse('toggle');
    });

    $('#addCardForm'+id).off();
    $('#addCardForm'+id).on('shown.bs.collapse', function(e) {
      $('#addCardTitle'+id).focus();
    });

    // Save new card
    $('#addCardBtn'+id).off();
    $('#addCardBtn'+id).click(function (e) {
      var val = $('#addCardTitle'+id).val();
      if (!val) {
        alert('Please enter a card title');
        return;
      }

      // Get the list object
      var list = board.getList(id);
      list.addCard(val);
      horello.mount(board);
    });

    // Cancel
    $('#addCardCancelBtn'+id).off();
    $('#addCardCancelBtn'+id).click(function (e) {
      $('#addCardForm'+id).collapse('hide');
    });
  });

  // Re-bind card detail modals.
  $('.card').each(function (idx) {
    $(this).off();
    $(this).click(function (e) {
      $('#cardEdit').modal('toggle', $(this));
    });
  });
};
