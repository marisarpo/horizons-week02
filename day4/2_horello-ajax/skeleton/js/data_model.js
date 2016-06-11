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

horello.getLists = function() {
  $.ajax("https://api.trello.com/1/boards/575b5729ef78e129edc4dc01/lists", {
    data: {
      key: "bd9cc6447063de7a24630d388840631d",
      token: "918dc72c847dfe8343d0df54344ccab24ffcfe3904c9247b5c6ca8ac94e9dd43",
    },
    method: "GET", 
    success: function(data) {
      for (var i=0; i<data.length; i++) {
        var list = horello.List.fromJSON(data[i]);
        board.lists.push(list);
      }
      board.lists.forEach(horello.getCards)
    },
    error: function(data) {
      console.log(data);
    }
  });
} 
horello.getCards = function(list) {
  console.log(list);
  $.ajax("https://api.trello.com/1/lists/"+list.id+"/cards", {
    data: {
      key: "bd9cc6447063de7a24630d388840631d",
      token: "918dc72c847dfe8343d0df54344ccab24ffcfe3904c9247b5c6ca8ac94e9dd43",
    },
    method: "GET",
    success: function(data) {
      for (var i=0; i<data.length; i++) {
        var card = horello.Card.fromJSON(data[i]);
        list.cards.push(card);
      }
      horello.mount(board);
    },
    error: function(data) {
      console.log(data);
    }
  });      
}

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
      $.ajax("https://api.trello.com/1/cards/"+this.id, {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: titleStr
      },
      method: "PUT",
      success: function(){}.bind(this),
      error: function(){}.bind(this)
    });
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
    this.desc = desc;
    $.ajax("https://api.trello.com/1/cards/"+this.id, {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        desc: desc
      },
      method: "PUT",
      success: function(){}.bind(this),
      error: function(){}.bind(this)
    });
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
  var card = new horello.Card(data.name,data.desc,data.idList);
  return card;
};


// LIST
//go through object of list attributes, take in the attributes of each list in the object, turn it into a list, and return it.

<<<<<<< HEAD
horello.List = function(id, name) {
  this.id = id;
=======
horello.List = function(name) {
  this.id = horello.generateId();
>>>>>>> refs/remotes/origin/master
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
    $.ajax("https://api.trello.com/1/lists/"+this.id, {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: name
      },
      method: "PUT",
      success: function(){}.bind(this),
      error: function(){}.bind(this)
    });
  },

  addCard: function(name, desc) {
    console.log(this)
    var card = new horello.Card(name, desc, this.id);
    this.cards.push(card);
    //return card.getId();
    $.ajax("https://api.trello.com/1/cards", {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: name,
        desc: desc,
        idList: this.getId()
      },
      method: "POST",
      success: function(){horello.requestList();}.bind(this),
      error: function(){}.bind(this)
    });
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
  var list = new horello.List(data.id,data.name);
  return list;
};


// BOARD

horello.Board = function () {
  this.lists = [];
  this.id = "575b5729ef78e129edc4dc01";
};

horello.Board.prototype = {
  addList: function(listName) {
    //return list.getId();
    $.ajax("https://api.trello.com/1/lists", {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: listName,
        idBoard: this.id,
        pos: "bottom"
      },
      method: "POST",
      success: function(){
        horello.getLists();
      }.bind(this),
      error: function(error){
        console.log(error);
      }.bind(this)
    });
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
  }
};
