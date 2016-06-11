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

horello.Card = function(id, title, desc, listId) {
  this.id = id;
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
  var card = new horello.Card(data.id, data.name, data.desc, data.idList);
  return card;
};


// LIST

<<<<<<< HEAD
horello.List = function(id, name) {
  this.id = id
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

  addCard: function(card) {
    this.cards.push(card);
    return card.getId();
  },

  addCardByName: function(cardName) {
    var card = new horello.Card(horello.generateId(), cardName);
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
  var list = new horello.List(data.id, data.name);
  return list;
};


// BOARD

horello.Board = function () {
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(list) {
    this.lists.push(list);
    return list.getId();
  },

  addListByName: function(listName) {
    var list = new horello.List(horello.generateId(), listName);
    this.lists.push(list);
    return list.getId();
  },

  getList: function(listId) {
    for (var i = 0; i < this.lists.length; i++) {
      if(this.lists[i].getId() === listId) {
        return this.lists[i];
      }
    }
    return undefined;
  },

  render: function() {
    var wrapper = $('<div id="board" class="board"></div>');
    wrapper.html(this.lists.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));
    return wrapper;
  }
};

var listOfLists = [];
var listOfCards = [];
horello.loadLists = function(board_id) {
  $.ajax(horello.apiUrl + '/boards/' + board_id + '/lists', {
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    method: 'GET',
    success: function(response) {
      listOfLists = _.map(response, horello.List.fromJSON);
      console.log(listOfLists);
      for (var i = 0; i < listOfLists.length; i++) {
        //debugger;
        board.addList(listOfLists[i]);
        horello.loadCards(listOfLists[i].id);
      }
    },
    error: function(err) {
      console.error(JSON.stringify(err));
    }
  })
}
horello.loadCards = function(list_id) {
  //debugger;
  $.ajax(horello.apiUrl + '/lists/' + list_id + '/cards', {
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    method: 'GET',
    success: function(response) {
      //debugger;
      listOfCards = _.map(response, horello.Card.fromJSON);
      console.log(listOfCards);
      var list = board.getList(list_id);
      for(var i = 0; i < listOfCards.length; i++) {
        list.addCard(listOfCards[i]);
      }
      horello.mount(board);
    },
    error: function(err) {
      console.error(JSON.stringify(err));
    }
  })
}


horello.loadLists(horello.boardId);
