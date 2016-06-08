"use strict";

window.horello = {};

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
  }
};

horello.List = function(id, name) {
  this.id = id;
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
  Trello.rest(
    "GET",
    "/boards/" + id + "/lists",
    function (data2) {
      console.log("Successfully loaded lists for board " + id);
      data2.forEach(function (data3) {
        horello.List.fromJSON(data3);
      });
    },
    function (err) {
      console.error("Error loading lists for board " + id + ": " + JSON.stringify(err));
    }
  );
};

horello.List.fromJSON = function(data) {
  var list = new horello.List(data.id, data.name);
  Trello.rest(
    "GET",
    "/lists/" + data.id + "/cards",
    function (data2) {
      console.log("Successfully loaded cards for list " + data.id);
      list.cards = data2.map(horello.Card.fromJSON);
      board.lists.push(list);
      horello.mount(board);
    }, function (err) {
      console.error("Error loading cards for list " + data.id + ": " + JSON.stringify(err));
    }
  );
};

horello.Card.fromJSON = function(data) {
  var card = new horello.Card(data.id, data.name, data.desc, data.idList);
  return card;
};
