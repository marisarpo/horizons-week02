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
    var cardwrapper = $('<div class="card" data-list-id="' + this.listId + '" data-card-id="' + this.id + '"></div>');
    var cardmore = $('<span class="card-more"></span>');
    if (this.getDescription()) {
      cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
    }
    var cardbody = $('<div class="card-body">' + this.title + '</div>');

    wrapper.append(cardwrapper);
    cardwrapper.append(cardmore);
    cardwrapper.append(cardbody);
    cardbody.append($("<p></p>")).text(this.title);

    return wrapper.html();
  }
};

horello.Card.fromJSON = function(data) {
  var cd = new horello.Card(data.name, data.desc, data.idList);
  return cd;
};


// LIST

horello.List = function(id, name) {
  if (arguments.length === 1) {
    this.id = horello.generateId();
  }
  if (arguments.length === 2) {
    this.id = id;
  }
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
    var card = new horello.Card(name, desc, this.getId());
    this.cards.push(card);

    $.ajax(horello.apiUrl + '/lists/' + this.id + '/cards', {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: name,
        desc: desc,
        idList: this.idList,
      },
      method: 'POST',
      success: function(data) {
        console.log('successful api call to post card');
      },
      error: function(data) {
        throw 'failed api call';
      }
    });

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
    var listWrapper = $('<div class="list" id="' + this.id + '"></div>');
    var listHeader = $('<div class="list-header"></div>');
    var listBody = $('<div class="list-cards"></div>');
    var listFooter = $('<div class="list-footer"></div>');

    wrapper.append(listContainer);
    listContainer.append(listWrapper);
    listWrapper.append(listHeader);
    listWrapper.append(listBody);
    listWrapper.append(listFooter);
    listHeader.append($('<span class="list-title"></span>').text(this.name));
    listFooter.append($('<button class="add-card" addCardId="' + this.id + '">Add a card...</button>'));
    listFooter.append($('\
      <div class="collapse" id="addCardForm' + this.id + '">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle' + this.id + '">\
      <button type="button" class="btn btn-default" id="addCardBtn' + this.id + '">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn' + this.id + '"></span>\
      </button>\
      </div>\
      </div>\
    '));

    // Build cards in the body
    listBody.html(this.cards.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));

    return wrapper.html();
  },

  loadList: function() {
    $.ajax(horello.apiUrl + '/lists/' + this.id + '/cards', {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
      },
      success: function(data) {
        console.log('successful api call to get cards');
        for (var i = 0; i < data.length; i++) {
          board.getList(data[i].idList).cards.push(horello.Card.fromJSON(data[i]));
        };
        horello.mount(board);
      },
      error: function(data) {
        throw 'failed api call';
      }
    });
  }
};

horello.List.fromJSON = function(data) {
  var lst = new horello.List(data.id, data.name);
  return lst;
};


// BOARD

horello.Board = function(id) {
  this.lists = [];
  this.id = id;
};

horello.Board.prototype = {
  addList: function(listName) {
    var list = new horello.List(listName);
    this.lists.push(list);

    $.ajax(horello.apiUrl + '/boards/' + this.id + '/lists', {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: listName,
        pos: "bottom"
      },
      method: 'POST',
      success: function(data) {
        console.log('successful api call to post list');
      },
      error: function(data) {
        throw 'failed api call';
      }
    });

    return list.getId();
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
  },

  loadBoard: function() {
    $.ajax(horello.apiUrl + '/boards/' + this.id + '/lists', {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
      },
      success: function(data) {
        console.log('successful api call to get lists');
        for (var i = 0; i < data.length; i++) {
          var lst = horello.List.fromJSON(data[i]);
          board.lists.push(lst);
          lst.loadList();
        };
      },
      error: function(data) {
        throw 'failed api call';
      }
    });
  }
};
