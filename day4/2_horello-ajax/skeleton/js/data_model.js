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

horello.Card = function(id,title, desc, listId) {

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
    $.ajax("https://api.trello.com/1/cards/" + this.id,{
      method:"PUT",
      data: {
        key : horello.apiKey,
        token : horello.apiToken,
        name : titleStr
      },
      success : function(data) {
        horello.mount(board);
      },
      error: function(msg) {console.log(JSON.stringify(msg));}
    })
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(cardDesc) {
    this.desc = cardDesc;
    $.ajax("https://api.trello.com/1/cards/" + this.id,{
      method:"PUT",
      data: {
        key : horello.apiKey,
        token : horello.apiToken,
        desc : cardDesc
      },
      success : function(data) {
        horello.mount(board);
      },
      error: function(msg) {console.log(JSON.stringify(msg));}
    })
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

  return new horello.Card(data.id,data.name,data.desc,data.idList);
  
};


// LIST

horello.List = function(id, name) {
  this.id = id;
  this.name = name;
  this.cards = [];
  var thoseCards = this.cards;

  $.ajax("https://api.trello.com/1/lists/" + this.id + "/cards",{
    method:"GET",
    data: {
      key : horello.apiKey,
      token : horello.apiToken,
    },
    success : function(arr_cards) {
      arr_cards.forEach(function(item) {
        thoseCards.push(horello.Card.fromJSON(item));
      })
      horello.mount(board);
    },
    error: function(msg) {console.log(JSON.stringify(msg));}
  });

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

  addCard: function(cardName, cardDesc) {
    var thoseCards = this.cards;
    $.ajax("https://api.trello.com/1/cards",{
      method:"POST",
      data: {
        key : horello.apiKey,
        token : horello.apiToken,
        idList : this.id,
        due : null,
        name : cardName,
        desc : cardDesc
      },
      success : function(data) {
        var newCard = horello.Card.fromJSON(data);
        thoseCards.push(newCard);
        horello.mount(board);
      },
      error: function(msg) {console.log(JSON.stringify(msg));}
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
   return new horello.List(data.id,data.name);
};


// BOARD

horello.Board = function () {
  this.lists = [];
  var thoseLists = this.lists;

  $.ajax("https://api.trello.com/1/boards/" + horello.boardId + "/lists",{
    method:"GET",
    data: {
      key : horello.apiKey,
      token : horello.apiToken,
    },
    success : function(arr_lists) {
      arr_lists.forEach(function(item) {
        thoseLists.push(horello.List.fromJSON(item));
      })
      horello.mount(board);
    },
    error: function(msg) {console.log(JSON.stringify(msg));}
  });


};

horello.Board.prototype = {
  addList: function(listName) {

    var thoseLists = this.lists;
    $.ajax("https://api.trello.com/1/lists",{
      method:"POST",
      data: {
        key : horello.apiKey,
        token : horello.apiToken,
        idBoard : horello.boardId,
        name : listName,
      },
      success : function(data) {
        var newList = horello.List.fromJSON(data);
        thoseLists.push(newList);
        horello.mount(board);
      },
      error: function(msg) {console.log(JSON.stringify(msg));}
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
