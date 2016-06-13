"use strict";

window.horello = window.horello || {};


//1 make ajax calls
//2 implement fromJSON methods
//3 load/pull all the data

var boardId = "5759e84cb4fbf6b01606f3c3";
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
  //need ajax call here to request to the Trello servers as well using PUT (meaning update)
  setTitle: function(titleStr) {
    
    $.ajax('https://api.trello.com/1/cards/' + this.id, {

      method:'PUT',
      
      data: {
        key: "15d4cc8a314d5d76847eda9cbaa2b878",
        token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",

        name: titleStr, 
      }
    })
    this.title = titleStr;
    horello.mount(board);
    
  },

  getDescription: function() {
    return this.desc;
  },
  //need ajax call here to request to the Trello servers as well
  setDescription: function(newDesc) {
   
    $.ajax('https://api.trello.com/1/cards/' + this.id, {

      method:'PUT',
      
      data: {
        key: "15d4cc8a314d5d76847eda9cbaa2b878",
        token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",

        desc: newDesc, 
      }
    })
    this.desc = newDesc;
    horello.mount(board);
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
  var card = new horello.Card(data.name, data.desc, data.idList, data.id);
  return card;
};


// LIST

horello.List = function(id, name, idBoard) {
  this.id = id;
  this.name = name;
  this.cards = [];
  this.idBoard = idBoard;
};

horello.List.prototype = {
  getId: function() {
    return this.id;
  },

  getName: function() {
    return this.name;
  },

  setName: function(newName) {
    
    var tList = $.ajax('https://api.trello.com/1/lists/' + this.id, {

    method:'PUT',
    
    data: {
      key: "15d4cc8a314d5d76847eda9cbaa2b878",
      token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",

      name: newName, 
      
    }
    })
    
    this.name = newName;
    horello.mount(board);
  },

  addCard: function(cardName, cardDesc) {
    var cards = this.cards;
    $.ajax('https://api.trello.com/1/cards', {

      method:'POST',
      success: function(data) {
        var tCard = data;
        var card = horello.Card.fromJSON(tCard);
        cards.push(card);
        horello.mount(board);
        return card.getId();
      },
      data: {
        key: "15d4cc8a314d5d76847eda9cbaa2b878",
        token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",

        name: cardName, 
        desc: cardDesc,
        due: null,
        pos: "top",     
        idList: this.id 
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
  var list = new horello.List(data.id, data.name, boardId);
  return list;
};


// BOARD

horello.Board = function () {

  this.lists = [];
  var lists = this.lists;

  function getCardsForList(listId, hList){
      $.ajax('https://api.trello.com/1/lists/' + listId +'/cards', {

          method:'GET',
          success: function(dataTwo) {
            for (var j = 0; j < dataTwo.length; j++) {
              var card = horello.Card.fromJSON(dataTwo[j]);
              //lists[i].cards.push(card);
              hList.cards.push(card);

              console.log("Get Board Debug: ", hList, card)
            }
            horello.mount(board);
          },
          data: {
            key: "15d4cc8a314d5d76847eda9cbaa2b878",
            token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",  
          }
        })
  }

 $.ajax('https://api.trello.com/1/boards/' + boardId + '/lists', {

    method:'GET',
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log("Went through for loop", i)
        var hList = horello.List.fromJSON(data[i]);
        lists.push(hList);

        getCardsForList(data[i].id, hList)
      }
      
    },
    data: {
      key: "15d4cc8a314d5d76847eda9cbaa2b878",
      token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",
    }

  })
};

horello.Board.prototype = {

  addList: function(listName) {
    //Add list to ajax
    
    var lists = this.lists;
    $.ajax('https://api.trello.com/1/lists', {

      method:'POST',
      success: function(data) {
        var tList = data;
        var list = horello.List.fromJSON(tList);
        
        lists.push(list);
        horello.mount(board);
        return list.getId();

      },
      data: {
        key: "15d4cc8a314d5d76847eda9cbaa2b878",
        token: "9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5",

        name: listName, 
        idBoard: boardId
      }

    })
    
    
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
