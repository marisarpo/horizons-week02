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



//=============================================================================================================
//Request Lists
horello.requestList = function() {
  $.ajax("https://api.trello.com/1/boards/575ad048c132200e1edb87d7/lists", {
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
    },
    method: "GET",
    success: function(data){
      // console.log("Got json List Data");
      for(var i = 0; i<data.length; i++){
        var list = horello.List.fromJSON(data[i]);
        // console.log("JSON to List");
        board.addListObj(list);
        //console.log("Added List to Board");
      }
      for(var i = 0; i<board.lists.length; i++){
        horello.requestCards(board.lists[i]);
      }

    },
    error: function(data){
      console.log(data);
    }

  });
}

//Request Card
horello.requestCards = function(list) {
  $.ajax("https://api.trello.com/1/lists/"+list.id+"/cards", {
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
    },
    method: "GET",
    success: function(data){
      // console.log(data);
      // console.log("Retrieved json Cards");
      for(var i = 0; i<data.length; i++){
        var card = horello.Card.fromJSON(data[i]);

        // console.log("^^*********************************************************************");
        //console.log(card);
        // console.log("from JSON to card");

        list.addCardObj(card);
      }
      horello.mount(board);
      //console.log(list);
    },
    error: function(data){
      // console.log(data);
    }
  });

}




//===========================================================================================================
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

  //put request
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

//Send in data for cards.
horello.Card.fromJSON = function(card) {
  // PHASE 1 code here
  var card = new horello.Card(card.id, card.name, card.desc, card.listId);
  return card;

};

//==================================================================================================
// LIST

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
  },
  //post
  addCard: function(name, desc) {
    var card = new horello.Card(name, desc, this.getId());
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
      success: function(){
        horello.requestList();
      }.bind(this),
      error: function(){

      }.bind(this)
    });
  },

  addCardObj(card){
    //console.log(card);
    this.cards.push(card);
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
    //console.log(this.cards);
    listBody.html(this.cards.reduce(function(prev, cur) {
      // console.log("here");
      // console.log(this);
      return prev + cur.render();
    }, ""));

    return wrapper.html();
  }
};


//Send in data for lists
horello.List.fromJSON = function(data) {
  // PHASE 1 code here
  var list = new horello.List(data.id,data.name);
  return list;
};


//================================================================================================================================
// BOARD

horello.Board = function () {
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(listName) {
    var list = new horello.List(listName);
    this.lists.push(list);
    $.ajax("https://api.trello.com/1/lists", {
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: listName,
        id: this.getId(),
        pos: "bottom"
      },
      method: "POST",
      success: function(){
        horello.requestList();
      }.bind(this),
      error: function(){
        horello.requestList();
      }.bind(this)
    });
    //return list.getId();
  },

  addListObj: function(list){
    this.lists.push(list);
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
