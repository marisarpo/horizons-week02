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

horello.Card = function(title, desc, listId, id) {
  this.id-id;
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
key: "4426aaac3e3ddf941ff93930255038d8",
token: "2a9829c4a7de4076e6c22b25237f356586253597b6760047cdddc0225923eaae",
name: titleStr
},
success: function(response){
//console.log(response)
this.title=titleStr; //jquery ajax... need to BIND 
horello.mount(board) //remount data, reset board, rerender baord with new title
}.bind(this),
error: function(err) {
console.log(err)
}
})
  },

  getDescription: function(desc) {
    $.ajax("https://api.trello.com/1/cards/"+ this.getId(), {
method: "PUT",
data: {
key: "4426aaac3e3ddf941ff93930255038d8",
token: "2a9829c4a7de4076e6c22b25237f356586253597b6760047cdddc0225923eaae",
desc: desc //update the description
},
success: function(response){
//console.log(response)
this.desc=desc;
horello.mount(board)
}.bind(this), //bind and rerender the boaard
error: function(err) {
console.log(err)
}
})
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

////RETURNS A CARD OBJECT
//takes one of trello's responses and returns a card
horello.Card.fromJSON = function(data) {
  // PHASE 1 code here
  var description=data.desc; //this is a static method, not part of prototype, don't have 'this' available (data refers to something
  //we pass in)
  var title = data.name;
  var id = data.id;
  var listId = data.idList;
  var c = new horello.Card(title, description, listId);
  c.id = id;
  return c;


  //var card = horello.Card(data.id, data.name, data.desc, data.idList); /// maatch necessary data imports from horello fles, 
  //look into card data for proper identification, similar list call to card

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

getData: function(){ ///second ajax request //substitute hardcoded id from console with +listId+, ''can call with this.id instead
  //new list object on get data takes all object properties and passes into get data (function caller is an object)
  //board's prototype get data takes in newe list get data
$.ajax("https://api.trello.com/1/lists/"+this.id + "/cards", {
method: "GET",
data: {
key: "4426aaac3e3ddf941ff93930255038d8",
token: "2a9829c4a7de4076e6c22b25237f356586253597b6760047cdddc0225923eaae"
},
  success: function(response){
   // debugger;
    response.forEach(function(card){
      var newCard = horello.Card.fromJSON(card);
      //'this' is NOT reliable iside of jquery functions
      board.getList(newCard.listId).cards.push(newCard) ///calls new list, newcard.id refers to one list, .cards to the cads array, 
      //which then pushed the new card into this array
      horello.mount(board); //to rewrite the board
    })
  },
error: function(err){
//console.error(err);
}
})
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
    return new horello.List(data.id, data.name);
};


// BOARD ///dont need to get board in this case because only one board, not pulling from other places

horello.Board = function () { //caller of horello.board function... costructor called in html
  ///actually calling board.getData() with this.getData()... should refresh automatically
  this.lists = [];
  this.getData();
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

  getData: function(){ ///refers to the horello.Board.prototype's getData()!
$.ajax("https://api.trello.com/1/boards/W9IdnnQU/lists", {
method: "GET",
data: {
key: "4426aaac3e3ddf941ff93930255038d8",
token: "2a9829c4a7de4076e6c22b25237f356586253597b6760047cdddc0225923eaae"
},
success: function(response){
  //this is what we want to change
//console.log(response);
response.forEach(function(list){
  var newList = horello.List.fromJSON(list);
  board.lists.push(newList);
  newList.getData(newList.id); //this refers to the horello.list's prototoype
});

},
error: function(err){
//console.error(err);
}
})
},
  render: function() {
    var wrapper = $('<div id="board" class="board"></div>');
    wrapper.html(this.lists.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));
    return wrapper;
  }
};

horello.loadData = function(board_id){
 // var listOfLists;
  //part 1 ajax call
 var data = $.ajax(horello.apiUrl +'/boards/' + board_id + '/lists',{ //returns data structure, not return values inside, not applicable yet
  //usng function for side effects not return values... care about responses, NOT the data inside
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
      method: "GET"
    },
   // method: "GET", //data and method are each separate parameters
    success: function(response){
      //part 2 success
     // console.log(JSON.stringify(response));
     //  var x = $.map(response, function(el){
     //  return el;
     // })
     // console.log(x)
     response.forEach(function(list){
  var newList = horello.List.fromJSON(list);
  board.lists.push(newList);
  newList.getData(newList.id); //this refers to the horello.list's prototoype
});
      //board.render();
       //par 3 = response call
  //var real = _.map(x, horello.List.fromJSON);
  //console.log(real)
 // console.log(real)
  ///need to get cards for list in here ater loaded, last step to render the data
  //can render the board here to rerender each time we have a card but will nonetheless render the full boaard
    },
    error: function(err){
    //console.error(JSON.stringify(err));
    }
  }) //can look up in horello api docs, shoulf load list data 
}
/////////////////////////ORDER: 1,3,2//////////////////////////////
///ajax= asyncronous


//don't care about return values, care about side efffects (printing messages, popping alerts, getting data but not returning data,
//initializing objects)
///getters return things, setters are called for side efffects( change something)

//POST is for adding new items, PUSH is for editing items (from horello to trello)


////////////////////////////////////////////////////////////////////////////
////call post to get the ids for horello going to 
//set list id to new id
// inside add card methid, take in name for new card, ping for new card on trello board, save id into our base so guaranteed
// to have correct id at all times NOTE: will show up on trello not horello


///ad API/ajax to horello.list.addCard (will heavily edit in the long run )
//name: name
//desc: desc (add description because cna add, call add card with description)
//ajax: this.getId()
//to save to particular list by id: board.getList(id)... grab list object and call addCard (from ajax request)
//ajax: instead of console.logging response want to create a new card (card.getid)... this refers to $, want it 
//to refer to the list... can use bind!!!! after success function, want to bind to the list: ;.bind(this): being bound to this
//as in list and no longer the jquery object --> ajax calls success(jquery object calls success)
//success card: has bad card id.... card.id should be response.id
///this.cards.psh(card)  (push new card into array of cards corresponding with the list) 
//horello.mount(board)   (reset the board to mount card onto the list)
//created horello.mount to update data model, mount(board) updates on our side

//////////////////////////////////////////////////////////////////
///editing:
//set description and set title are changed when editing a card
//once set, want to push to thrello api (from horello)
//method: PUT
//post/1/lists: adds the new list (name, board id (from Trello), id, token) !!!!NEED LONG ID FROM SANDBOX!!!
//can reset position through pos: "bottom", etc (want to normally send to bottom because trello acts that way...consistency)
//can use multiple pathways for trello
//add list: exact same thing as for add card

///editing cards: