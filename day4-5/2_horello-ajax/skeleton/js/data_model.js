"use strict";

window.horello = window.horello || {};

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
    this.title = titleStr;
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
    this.desc = desc;
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
  // PHASE 1 code here
  // takes a data object and returns a card object
  // data corresponds to one of the objects that we returned on the jQuery console we tried
  // TAKES ONE OF TRELLO"S RESPONSES AND RETURNS A CARD OBJECT
  // not part of prototype so we don't have "this" available to us
  var title = data.name;
  var description = data.desc;
  var id = data.id;
  var listId = data.idList;

  var newCard = new horello.Card(title, description, listId);
  newCard.id = id;

  return newCard;
};


// LIST

<<<<<<< HEAD:day4/2_horello-ajax/skeleton/js/data_model.js
horello.List = function(id, name) {
  this.id = id; // we are not using generatedId because, quote ethan, its dumb
=======
horello.List = function(name) {
  this.id = horello.generateId();
>>>>>>> master:day4-5/2_horello-ajax/skeleton/js/data_model.js
  this.name = name;
  this.cards = [];
};

horello.List.prototype = {
  getId: function() {
    return this.id;
  },

  getData: function() {
    $.ajax("https://api.trello.com/1/lists/" + this.id + "/cards/", { 
      method: "GET",
      data: {
       key: "63aa587ffd2bc71922dbbbdf72958ded",
      token: "a347b3f17d5ca9479ee565757c0e5a80661b163dd7e2e67aaa7af535e4cd73f7" },
      success: function(response) {
      // we want to change this
      // loop through array of cards
      //this is not reliable in jQuery functions
      response.forEach(function(card) {
        var newCard = horello.Card.fromJSON(card);
        board.getList(newCard.listId).cards.push(newCard);
        // rerendering the board
        horello.mount(board);
      })
      },
      error: function(err) {
      console.error(err);
      }
      });
  },

  getName: function() {
    return this.name;
  },

  setName: function(name) {
    this.name = name;
  },

  addCard: function(name, desc) {
    var card = new horello.Card(name, desc, this.getId());
    this.cards.push(card);
    return card.getId();
  },

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
  // PHASE 1 code here
  return new horello.List(data.id, data.name);
};


// BOARD

horello.Board = function () {
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(listName) {
    var list = new horello.List(listName);
    this.lists.push(list);
    return list.getId();
  },

  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },

  getData: function() {
    $.ajax("https://api.trello.com/1/boards/7G3PJMj0/lists", { 
      method: "GET",
      data: {
       key: "63aa587ffd2bc71922dbbbdf72958ded",
      token: "a347b3f17d5ca9479ee565757c0e5a80661b163dd7e2e67aaa7af535e4cd73f7" },
      success: function(response) {
      //this is what we want to change from our console code
      // we want to save the lists and add the cards.
      //loop through the array of lists
      response.forEach(function(list) {
        var newList = horello.List.fromJSON(list);
        board.lists.push(newList);
        newList.getData(); // this is the horello.List.prototype's getData
      })
      board.addList();
      },
      error: function(err) {
      console.error(err);
      }
      });
  },

  render: function() {
    var wrapper = $('<div id="board" class="board"></div>');
    wrapper.html(this.lists.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));
    return wrapper;
  }
};
