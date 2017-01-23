"use strict";

window.horello = window.horello || {};

// remove this stuff
horello.generateId = function() {
  var chunk = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};

// CARD

horello.Card = function(title, desc, listId) {
  this.id = horello.generateId();
  this.listId = listId;
  this.title = title;
  this.desc = desc;
};

horello.Card.prototype = {
  getId: function() {
    return this.id;
  },

  getTitle: function() {
    return this.title;
  },

  setTitle: function(titleStr) {
    // YOUR CODE TO PUT TO TRELLO
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
      // YOUR CODE TO PUT TO TRELLO
  },

  render: function() {
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
  }
};

horello.Card.fromJSON = function(data) {
  // YOUR CODE HERE
  // PHASE 1 code here
};


// LIST

horello.List = function(name) {
  this.id = horello.generateId();
  this.name = name;
  this.cards = [];
};

horello.List.prototype = {
  getId: function() {
    return this.id;
  },

  getName: function() {
    return this.name;
  },

  setName: function(name) {
    this.name = name;
  },

  addCard: function(name, desc) {

// YOUR CODE HERE TO POST TO TRELLO
// on success call       this.loadCards();
  },


// WHAT IS THIS?? GET FROM WHERE? WHY DO WE need this.
  getCard: function(cardId) {
    var card = this.cards.filter(function(c) {
      return (c.getId() == cardId);
    });
    if (card.length > 0) {
      return card[0];
    }
    return null;
  },

  render: function() {
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
};

horello.List.fromJSON = function(data) {
  // THIS IS  NEEDED TO RENDER LIST??
};
horello.List.loadCards =function() {
  // YOUR CODE TO IMPORT CARDS
  // CALLS  horello.mount(board);
  });

horello.List.fromJSON = function(data) {
    // YOUR CODE HERE. DO WE NEED THIS??
    // PROBABS NOT.
    var list = new horello.List(data.id, data.name);
    board.lists.push(list);
    list.loadCards();
  };

// BOARD

horello.Board = function () {
  // ADD ID
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(listName) {
    // YOUR CODE HERE
    //THIS SHOULD POST TO TRELLO /lists
    // calls   this.loadData(); on success, the one below that in time
    //         calls   list.loadCards();
    //         calls   horello.mount(board);


  },

  getList: function(listId) {
    // DO WE NEED THIS? PROBABLY BEING GET AT  LOADDATA
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },

  render: function() {
    var wrapper = $('<div id="board" class="board"></div>');
    wrapper.html(this.lists.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));
    return wrapper;
  },
  loadData: function() {
  // YOUR CODE HERE TO LOAD LISTS
  // CALLS  data.forEach(function (data2) {
  //               horello.List.fromJSON(data2);
  //       });
  // Which calls   list.loadCards();
  // Which calls   horello.mount(board);
  }
};
