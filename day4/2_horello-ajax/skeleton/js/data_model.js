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
    $.ajax("https://api.trello.com/1/cards/"+this.getId(), {
      method: "PUT",
      data: {
        key: "68154753bc7729bf63832281e73f485e",
        token: "86c05ce3b37a3be9e9d781da0d65170f34596d00938e4b69c8dc2fac364ac32d",
        name: titleStr
      },
      success: function(response) {
        this.title = titleStr;
        horello.mount(board)
      }.bind(this),
      error: function(response) {
        console.error(response);
      }
    });
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
    $.ajax("https://api.trello.com/1/cards/"+this.getId(), {
      method: "PUT",
      data: {
        key: "68154753bc7729bf63832281e73f485e",
        token: "86c05ce3b37a3be9e9d781da0d65170f34596d00938e4b69c8dc2fac364ac32d",
        desc: desc
      },
      success: function(response) {
        this.desc = desc;
        horello.mount(board);
      }.bind(this),
      error: function(response) {
        console.error(response);
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

// TAKES ONE OF TRELLO'S RESPONSES AND RETURNS A CARD OBJECT
horello.Card.fromJSON = function(data) {
  // PHASE 1 code here
  var description = data.desc;
  var title = data.name;
  var id = data.id;
  var listId = data.idList;
  var newCard = new horello.Card(title, description, listId);
  newCard.id = id;
  return newCard;
};


// LIST

<<<<<<< HEAD
horello.List = function(id, name) {
  this.id = id;
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

  getData: function() {
    $.ajax("https://api.trello.com/1/lists/"+this.id+"/cards", {
      method: "GET", 
      data: {
        key: "68154753bc7729bf63832281e73f485e",
        token: "86c05ce3b37a3be9e9d781da0d65170f34596d00938e4b69c8dc2fac364ac32d"
      },
      success: function(response) {
        response.forEach(function(card) {
          var newCard = horello.Card.fromJSON(card);
          board.getList(newCard.listId).cards.push(newCard);
          horello.mount(board);
        })
      },
      error: function(response) {
        console.error(response);
      }
    });
  },

  setName: function(name) {
    this.name = name;
  },

  addCard: function(name, desc) {
    $.ajax("https://api.trello.com/1/lists/"+this.getId()+"/cards", { //poasijdfpoiajdpfpoiadfpoiajfidopjpi
      method: "POST", 
      data: {
        key: "68154753bc7729bf63832281e73f485e",
        token: "86c05ce3b37a3be9e9d781da0d65170f34596d00938e4b69c8dc2fac364ac32d",
        name: name,
        desc: desc
      },
      success: function(response) {
        var card = new horello.Card(name, desc, this.getId());
        card.id = response.id;
        this.cards.push(card);
        horello.mount(board);
      }.bind(this),
      error: function(response) {
        console.error(response);
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
  }
};

horello.List.fromJSON = function(data) {
  // PHASE 1 code here
  return new horello.List(data.id, data.name);
};


// BOARD

horello.Board = function () {
  this.lists = [];
  this.getData();
};

horello.Board.prototype = {
  addList: function(listName) {
    $.ajax("https://api.trello.com/1/board/575b02be2c4502f5f1f8bedb/lists/", { //poasijdfpoiajdpfpoiadfpoiajfidopjpi
      method: "POST", 
      data: {
        key: "68154753bc7729bf63832281e73f485e",
        token: "86c05ce3b37a3be9e9d781da0d65170f34596d00938e4b69c8dc2fac364ac32d",
        name: listName,
        pos: "bottom"
      },
      success: function(response) {
        var newList = new horello.List(response.id, listName);
        this.lists.push(newList);
        horello.mount(board);
      }.bind(this),
      error: function(response) {
        console.error(response);
      }
    });
  },

  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },

  getData: function() {
    $.ajax("https://api.trello.com/1/boards/575b02be2c4502f5f1f8bedb/lists", {
        method: "GET", 
        data: {
          key: "68154753bc7729bf63832281e73f485e",
          token: "86c05ce3b37a3be9e9d781da0d65170f34596d00938e4b69c8dc2fac364ac32d"
        },
        success: function(response) {
          response.forEach(function(list) {
            var newList = horello.List.fromJSON(list);
            board.lists.push(newList);
            newList.getData();
          })
        },
        error: function(response) {
          console.error(response);
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
