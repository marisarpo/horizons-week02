"use strict";

window.horello = window.horello || {};

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
    Trello.put("/cards/" + this.id, {
      name: titleStr
    }, function (data) {
      console.log("Successfully updated title of card " + this.id);
    }.bind(this), function (err) {
      console.error("Error updating title of card " + this.id);
    }.bind(this));
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
    this.desc = desc;
    Trello.put("/cards/" + this.id, {
      desc: desc
    }, function (data) {
      console.log("Successfully updated desc of card " + this.id);
    }.bind(this), function (err) {
      console.error("Error updating desc of card " + this.id);
    }.bind(this));
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
  var card = new horello.Card(data.id, data.name, data.desc, data.idList);
  return card;
};


// LIST

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
    // First create the data in the API.
    Trello.post("/cards", {
      name: name,
      desc: desc,
      idList: this.id
    }, function (data) {
      // Success! Now we have an ID and we can create it locally. Or,
      // we can reload the data from the API.
      console.log("Successfully created new card: " + JSON.stringify(data));
      this.loadCards();
    }.bind(this), function (err) {
      console.error("Error creating new card: " + JSON.stringify(err));
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
  },

  loadCards: function() {
    Trello.get(
      "/lists/" + this.id + "/cards",
      function (data2) {
        console.log("Successfully loaded cards for list " + this.id);
        this.cards = data2.map(horello.Card.fromJSON);

        // Re-render.
        horello.mount(board);
      }.bind(this), function (err) {
        console.error("Error loading cards for list " + data.id + ": " + JSON.stringify(err));
      }
    );
  }
};

horello.List.fromJSON = function(data) {
  var list = new horello.List(data.id, data.name);
  board.lists.push(list);
  list.loadCards();
};


// BOARD

horello.Board = function (id) {
  this.id = id;
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(listName) {
    Trello.post("/lists", {
      name: listName,
      idBoard: this.id,
      pos: 'bottom'
      },
      function (data) {
        console.log("Successfully created list with ID " + data.id + " for board " + this.id);
        this.loadData();
      }.bind(this),
      function (err) {
        console.error("Error creating list for board " + this.id);
      }.bind(this)
    );
    this.lists.push(list);
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

  loadData: function() {
    // Clear the current data first
    this.lists = [];

    // Load data
    Trello.get(
      "/boards/" + this.id + "/lists",
      function (data) {
        console.log("Successfully loaded lists for board " + this.id);
        data.forEach(function (data2) {
          horello.List.fromJSON(data2);
        });
      }.bind(this), function (err) {
        console.error("Error loading lists for board " + this.id + ": " + JSON.stringify(err));
      }.bind(this)
    );
  }
};
