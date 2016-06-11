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

// horello.apiKey = "8aa42f134ca8a6caeee22d86021ff209";
// horello.apiToken = "315f3998dee8268a7c268c06729abe01b357aa594aac81f8949d7ae450e20942";
// horello.apiUrl = "https://api.trello.com/1";

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

//takes a data object and RETURNS A CARD
//HOW? LOOK AT CONSTRUCTOR: TAKES TITLE, DESC, AND LIST ID
//TAKES ONE OF TRELLO'S RESPONSE AND RETURNS A CARD OBJECT (cuz we don't want all of the things that trello returns)
//THIS IS A STATIC METHOD
//this is not part of the prototype, so we don't use 'this'
horello.Card.fromJSON = function(data) {
  var title = data.name;
  var id = data.id;
  var description = data.desc;
  var listId= data.idList;
  var c = new horello.Card(title, description,listId);
  c.id = id;
  return c;
  // PHASE 1 code here
};


// LIST

// <<<<<<< HEAD
horello.List = function(id, name) {
  this.id = id
// =======
horello.List = function(name) {
  this.id = horello.generateId();
// >>>>>>> master
  this.name = name;
  this.cards = [];
};

horello.List.prototype = {
  getId: function() {
    return this.id;
  },

  getData: function(){
    console.log(this.id, "asdfasdf")
    $.ajax("https://api.trello.com/1/lists/" + this.id + "/cards",{
      method: "GET",
      data: {
        key: "8aa42f134ca8a6caeee22d86021ff209",
        token: "315f3998dee8268a7c268c06729abe01b357aa594aac81f8949d7ae450e20942"
      },
      success: function(response){
        response.forEach(function(card){
          var newCard = horello.Card.fromJSON(card);
          //'this' is not what we expect here - not reliable in jquery functions
          board.getList(newCard.listId).cards.push(newCard);
          //getting from the board the list(getlist(newCard.listId)) and pushing it onto the newcard
          //created a new card in the data model
          horello.mount(board); //rewrite the html
        })
      },
      error: function(err){
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
  console.log(data)
  return new horello.List(data.id, data.name);
};


// BOARD

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

  getData: function(){//this refers to the horello.Board.prototype's getData()
    $.ajax("https://api.trello.com/1/boards/MbW4EUuP/lists",{
      method: "GET",
      data: {
        key: "8aa42f134ca8a6caeee22d86021ff209",
        token: "315f3998dee8268a7c268c06729abe01b357aa594aac81f8949d7ae450e20942"
      },
      success: function(response){
        //this is what we want to change - we got an array of objects (lists)
        //we want to save these lists (and fill them with cards)
        //how do we add an object to an array?
        response.forEach(function(list){
          //add this to an array
              var newList = horello.List.fromJSON(list);
              board.lists.push(newList);
              newList.getData(); //this refers to the horello.List.prototype's getData() - this doesn't get an argument anymore
        });
      },
      error: function(err){
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
