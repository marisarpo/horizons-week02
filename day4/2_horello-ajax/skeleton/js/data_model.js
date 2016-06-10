"use strict";

window.horello = window.horello || {};

/*
horello.generateId = function() {
  var chunk = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};
*/

// CARD

horello.Card = function(title, desc, listId, id) {
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
    $.ajax(horello.apiUrl + "/cards/" + this.getId(), {
      method: "PUT",
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: titleStr
      },
      success: function (data) {
        console.log("Great Success! Title of card " + this.getId() + ' updated.');
      }.bind(this),
      error: function (err) {
        console.error("Could not update title of card " + this.getId() + ": " + JSON.stringify(err));
      }.bind(this)
    });
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
    this.desc = desc;
    $.ajax(horello.apiUrl + "/cards/" + this.getId(), {
      method: "PUT",
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        desc: desc
      },
      success: function (data) {
        console.log("Great Success! Description of card: " + this.getId() +' updated.');
      }.bind(this),
      error: function (err) {
        console.error("Could not update description of card " + this.getId() + ": " + JSON.stringify(err));
      }.bind(this)
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
  // PHASE 1 code here
  if (data.desc === undefined) {
    return new horello.Card(data.name, '', data.idList, data.id);
  }
  return new horello.Card(data.name, data.desc, data.idList, data.id);
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
    $.ajax(horello.apiUrl + "/cards", {
      method: "POST",
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: name,
        desc: desc,
        idList: this.getId()
      },
      success: function (data) {
        // Success! Now we have an ID and we can create it locally. Or,
        // we can reload the data from the API.
        console.log("Great Success! New card: " + JSON.stringify(data) + ' has been created.');
        this.callCards();
      }.bind(this),
      error: function (err) {
        console.error("Could not create new card: " + JSON.stringify(err));
      }
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

  callCards: function() {
    $.ajax(horello.apiUrl + "/lists/" + this.getId() + "/cards", {
      data: {
        key: horello.apiKey,
        token: horello.apiToken
      },
      success: function (cardData) {
        console.log("Great Success! Cards for list: " + this.getId() + ' have been loaded.');
        this.cards = cardData.map(horello.Card.fromJSON);

        // Re-render.
        horello.mount(board);
      }.bind(this),
      error: function (err) {
        console.error("Could not load cards for list " + data.getId() + ": " + JSON.stringify(err));
      }
    });
  }
};

horello.List.fromJSON = function(data) {
  // PHASE 1 code here
  var newList = new horello.List(data.id, data.name);
  board.lists.push(newList);
  newList.callCards();
};


// BOARD

horello.Board = function (id) {
  this.id = id;
  this.lists = [];
};

horello.Board.prototype = {
  getId: function() {
    return this.id;
  },

  addList: function(listName) {
    $.ajax(horello.apiUrl + "/lists", {
        method: "POST",
        data: {
          key: horello.apiKey,
          token: horello.apiToken,
          name: listName,
          idBoard: this.id,
          pos: 'bottom'
        },
        success: function (data) {
          console.log("Great Success! List with ID " + data.id + " for board " + this.getId() + " was created.");
          this.loadData();
        }.bind(this),
        error: function (err) {
          console.log(this);
          console.error("Could not create list for board " + this.getId() + ": " + JSON.stringify(err));
        }.bind(this)
      }
    );
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
    this.lists = [];

    $.ajax(horello.apiUrl + "/boards/" + this.getId() + "/lists", {
        data: {
          key: horello.apiKey,
          token: horello.apiToken
        },
        success: function (data) {
          console.log("Great Success! Lists for board " + this.getId() + ' loaded.');
          data.forEach(function (dataLists) {
            horello.List.fromJSON(dataLists);
          });
          board.id = data.boardId;
        }.bind(this),
        error: function (err) {
          console.error("Could not load lists for board " + this.getId() + ": " + JSON.stringify(err));
        }.bind(this)
      }
    );
  }
};
