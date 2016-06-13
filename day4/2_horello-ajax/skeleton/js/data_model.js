"use strict";

window.horello = window.horello || {};

<<<<<<< HEAD
// CARD

horello.Card = function(id, title, desc, listId) {
  this.id = id;
=======
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
>>>>>>> master
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

<<<<<<< HEAD
  // ajax call inside
  setTitle: function(titleStr) {
    this.title = titleStr;

    // set ajax variables
    var url = horello.apiUrl + "/cards/" + this.getId();
    var putData = {key: horello.apiKey, token: horello.apiToken, name: titleStr};

    // make ajax call
    $.ajax(url, {
      method: "PUT",
      data: putData
    });
  },

  // should have ajax?
=======
  setTitle: function(titleStr) {
    this.title = titleStr;
  },

>>>>>>> master
  getDescription: function() {
    return this.desc;
  },

<<<<<<< HEAD
  // ajax call inside
  setDescription: function(desc) {
    this.desc = desc;

    // set ajax variables
    var url = horello.apiUrl + "/cards/" + this.getId();
    var putData = {key: horello.apiKey, token: horello.apiToken, desc: desc};


    // make ajax call
    $.ajax(url, {
      method: "PUT",
      data: putData
    });
=======
  setDescription: function(desc) {
    this.desc = desc;
>>>>>>> master
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
<<<<<<< HEAD
  var card = new horello.Card(data.id, data.name, data.desc, data.idList);
  return card;
=======
  // PHASE 1 code here
>>>>>>> master
};


// LIST

<<<<<<< HEAD
<<<<<<< HEAD
horello.List = function(id, name) {
  this.id = id;
=======
horello.List = function(name) {
  this.id = horello.generateId();
>>>>>>> master
=======
horello.List = function(name) {
  this.id = horello.generateId();
>>>>>>> master
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

<<<<<<< HEAD
  // ajax call inside
  addCard: function(name, desc) {

    // set ajax variables
    var url = horello.apiUrl + "/cards";
    var postData = {
        key: horello.apiKey,
        token: horello.apiToken,
        name: name,
        desc: desc,
        idList: this.getId()
      };

    // set ajax functions
    var successFunction = function () {
        this.loadCards();
      };

    // make ajax call
    $.ajax(url, {
      method: "POST",
      data: postData,
      success: successFunction.bind(this)
    });
=======
  addCard: function(name, desc) {
    var card = new horello.Card(name, desc, this.getId());
    this.cards.push(card);
    return card.getId();
>>>>>>> master
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
<<<<<<< HEAD
  },

  // ajax call inside
  // this load cards from Trello and re-renders the page
  loadCards: function() {

    // set ajax variables
    var url = horello.apiUrl + "/lists/" + this.getId() + "/cards";
    var getData = {key: horello.apiKey, token: horello.apiToken}

    // set ajax functions
    var successFunction = function(listOfCards) {
        this.cards = listOfCards.map(horello.Card.fromJSON);

        // Re-render board
        horello.mount(board);
    }

    // make ajax call
    $.ajax(url, {
      data: getData,
      success: successFunction.bind(this)
    });
  }
};

// build list from JSON, push it to board, and call list.loadCards()
horello.List.fromJSON = function(data) {
  var list = new horello.List(data.id, data.name);
  board.lists.push(list);
  list.loadCards();
=======
  }
};

horello.List.fromJSON = function(data) {
  // PHASE 1 code here
>>>>>>> master
};


// BOARD

<<<<<<< HEAD
horello.Board = function (id) {
  this.id = id;
=======
horello.Board = function () {
>>>>>>> master
  this.lists = [];
};

horello.Board.prototype = {
<<<<<<< HEAD
  getId: function() {
    return this.id;
  },

  // ajax call inside
  addList: function(listName) {

    // set ajax variables
    var url = horello.apiUrl + "/lists";
    var postData = {
          key: horello.apiKey,
          token: horello.apiToken,
          name: listName,
          idBoard: this.id,
          pos: 'bottom'
        };

    // set ajax functions
    var successFunction = function() {
      this.loadBoard();
    }
    var errorFunction = function() {
      this.loadBoard();
    }

    // make ajax call
    $.ajax(url, {
        method: "POST",
        data: postData,
        success: successFunction.bind(this),
        error: errorFunction.bind(this)
      }
    );
=======
  addList: function(listName) {
    var list = new horello.List(listName);
    this.lists.push(list);
    return list.getId();
>>>>>>> master
  },

  getList: function(listId) {
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
<<<<<<< HEAD
  },

  // ajax call inside
  loadBoard: function() {
    // Clear the current data first
    this.lists = [];

    // set ajax variables
    var url = horello.apiUrl + "/boards/" + this.getId() + "/lists";
    var getData = {
          key: horello.apiKey,
          token: horello.apiToken
        };

    // set ajax functions
    var successFunction = function (data) {
          data.forEach(function (listJSON) {
            horello.List.fromJSON(listJSON);
          });
        };

    // make ajax call
    $.ajax(url, {
        data: getData,
        success: successFunction.bind(this)
      }
    );
  }

};


=======
  }
};
>>>>>>> master
