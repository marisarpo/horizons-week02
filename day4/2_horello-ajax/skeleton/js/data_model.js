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

  //set ajax

  setTitle: function(titleStr) {
    $.ajax("https://api.trello.com/1/cards/"+ this.getId(), {
      method: "PUT",
        data: {
        key: "0bcc95c82f5216eed9742694918ea858",
        token: "d65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013",
        name: titleStr
      },
      success: function(response) {
        this.title = titleStr;
        horello.mount(board);
      }.bind(this),
      error: function(err) {
        console.error(err);
      }
    });
  },

  getDescription: function() {
    return this.desc;
  },

  //set ajax

  setDescription: function(desc) {
    $.ajax("https://api.trello.com/1/cards/" + this.getId(), {
      method: "PUT",
        data: {
        key: "0bcc95c82f5216eed9742694918ea858",
        token: "d65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013",
        desc: desc
      },
      success: function(response) {
        this.desc = desc;
        horello.mount(board);
      }.bind(this),
      error: function(err) {
        console.error(err);
      }
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
  var title = data.name;
  var description = data.desc;
  var id = data.id;
  var listId = data.idList;
  var c = new horello.Card(title, description, listId);
  c.id = id;
  return c;
};


// LIST

horello.List = function(id, name) {
  this.id = id
  this.name = name;
  this.cards = [];
};

horello.List.prototype = {
  getId: function() {
    return this.id;
  },

  getData: function() {
    $.ajax("https://api.trello.com/1/lists/"+this.id+"/cards", {
      method: "GET",
      data: {
        key: "0bcc95c82f5216eed9742694918ea858",
        token: "d65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013"
      },
      success: function(response) {
        response.forEach(function(card) {
          var newCard = horello.Card.fromJSON(card);
          board.getList(newCard.listId).cards.push(newCard);
          horello.mount(board);
        });
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
    $.ajax("https://api.trello.com/1/lists/"+this.getId()+"/cards", {
    method: "POST",
    data: {
      key: "0bcc95c82f5216eed9742694918ea858",
      token: "d65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013",
      name: name,
      desc: desc
    },
    success: function(response) {
      console.log(response);
      var card = new horello.Card(name, desc, this.getId());
      card.id = response.id;
      this.cards.push(card);
      horello.mount(board);

    }.bind(this),
    error: function(err) {
      console.error(err);
    }
    })
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
  return new horello.List(data.id, data.name)
};


// BOARD

horello.Board = function () {
  this.lists = [];
  this.getData();
};

horello.Board.prototype = {
  addList: function(listName) {
    $.ajax("https://api.trello.com/1/lists/", {
    method: "POST",
      data: {
      key: "0bcc95c82f5216eed9742694918ea858",
      token: "d65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013",
      name: "List 3",
      idBoard: "575b03e2c107d8252bc38af5",
      pos: "bottom"
    },
    success: function(response) {
      var newList = new horello.List(response.id, listName);
      this.lists.push(newList);
      horello.mount(board);
    }.bind(this),
    error: function(err) {
    console.error(err);
    }
    })
  },

  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },

  getData: function() {
    $.ajax("https://api.trello.com/1/boards/rTqq9r9A/lists", {
      method: "GET",
      data: {
        key: "0bcc95c82f5216eed9742694918ea858",
        token: "d65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013"
      },
      success: function(response) {
        response.forEach(function(list) {
          var newList = horello.List.fromJSON(list);
          board.lists.push(newList);
          newList.getData(); //this refers to the horello.List.prototype's getData()
        })
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