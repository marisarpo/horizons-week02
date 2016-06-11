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




// $.ajax(horello.apiUrl +'/lists', {
//     data: {
//       id: "575ac5a3206374220b3187b6", 
//       name: "Welcome Board",
//       key: "e34966f53e55adb205250c55bc74c59b",
//       token: "a67189d865bdf0001473a7ab3a6b3d1c8f5665dc2553537e287fec57cca2fd6d"
//       }, 
//       method: "GET",
//       success: function(data){
//         return data; 
//       }, 
//       error: function(){
//         throw 'error' }
// });

// $.ajax('https://api.trello.com/1/boards/575ac5a3206374220b3187b6/lists/', {
//     data: {
//       key: horello.apiKey,
//       token: horello.apiToken}, 
//       method: "GET",
//       success: function(data){
//         for(var i = 0; i < data.length; i++){
//           horello.List.fromJSON(data[i]); 
//         return data; 
//         }
//       }, 
//       error: function(){
//         throw 'error' }
// });

//Get List
horello.requestLists = function () {
$.ajax('https://api.trello.com/1/boards/575ac5a3206374220b3187b6/lists/', {
    data: {
      method: "GET",
      key: horello.apiKey,
      token: horello.apiToken}, 
      success: function(data){
        for(var i = 0; i < data.length; i++){
          var list = horello.List.fromJSON(data[i]); 
          board.addListObj(list); 
          // console.log(list);
        }
        for(var i = 0; i < board.lists.length; i++){ //contains all the lists on the baord, is an array of boards
          console.log("test");
          horello.requestCards(board.lists[i]); 
        }
      }, 
      error: function(){
        throw 'error' }

});
}

//get cards
horello.requestCards = function (list) {
  $.ajax(horello.apiUrl + "/lists/" + list.id + "/cards", {
    data: {
      method: "GET",
      key: horello.apiKey,
      token: horello.apiToken}, 
      success: function(data){
        for(var i = 0; i < data.length; i++){
          var card = horello.Card.fromJSON(data[i]);
          list.addCardObj(card);
        }
        horello.mount(board); 
      }, 

      error: function(){
        throw 'error' }
});
}

// CARD
// 1) getting data and updating in horello 2) do ajax calls for anything your 
horello.Card = function(id, title, desc, listId) {
  this.id = id; //dont need to generate a new id 
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
      $.ajax('https://api.trello.com/1/cards' + this.getId(), { //need a FUNCTION to get the current ID here 
        method: "PUT",                                          // Need the kind of method it is acc. API
        data: {
          key: horello.apiKey,
          token: horello.apiToken, 
          name: titleStr
        }, 
        success: function(data) { 
          console.log("Updated title of card" + this.getId()); //this is a function to get the ID  
        }.bind(this),
        error: function(err){
          console.log(("Error updating title" + this.getId()+ ": " + JSON.stringify(err)));
        }.bind(this) //bind this together 
      });
  },

  getDescription: function() {
    return this.desc;
  },


  setDescription: function(desc) {
    this.desc = desc;

      $.ajax('https://api.trello.com/1/cards' +this.getId(), { //need a FUNCTION to get the current ID here 
        method: "PUT",                                          // Need the kind of method it is acc. API
        data: {
          key: horello.apiKey,
          token: horello.apiToken, 
          desc: desc
        }, 
        success: function(data) { 
          console.log("Updated title of card" +this.getId()); //this is a function to get the ID  
        }.bind(this),
        error: function(someErr){
          console.log("Error updating title" + this.getId()+ ": " + JSON.stringify(someErr));
        }.bind(this) //bind this to what we are talking about here (the card)
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

horello.Card.fromJSON = function(data) {  // 
  var card = new horello.Card(data.id, data.name, data.desc, data.idList);
  return card; 

};


// LIST

horello.List = function(id, name) {
  this.id = id; // you're putting in from your own id, so you dont have to generate a new one 
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

  setName: function(name) { // you dont need to pull ajax here because you get all this information from the card above when you set title and desc. 
    this.name = name;
  },

  addCard: function(name, desc) {  // need to update this because you aren't just getting static things like before 
    $.ajax(horello.apiUrl + "/cards", { // tells you you dont need to update the id in the URL here 
      method: "POST",
      data: {
        key: horello.apiKey,
        token: horello.apiToken,
        name: name,
        desc: desc,
        idList: this.getId()
      },
      success: function (data) {
        horello.requestLists();
        console.log("Successfully created new card: " + JSON.stringify(data));
        }.bind(this),
      error: function (err) {
        console.error("Error creating new card: " + JSON.stringify(err));
      }
    });
  },

  addCardObj: function(card){
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
    listBody.html(this.cards.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));

    return wrapper.html();
  }
};

horello.List.fromJSON = function(data) {
  var list = new horello.List(data.id, data.name);
  //board.lists.push(list); 
  return list;
};




// BOARD

horello.Board = function () {
  this.lists = [];
};

horello.Board.prototype = {

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
          horello.requestLists(); 
          console.log("Successfully created list with ID " + data.id + " for board " + this.getId());
        }.bind(this),
        error: function (err) {
          console.error("Error creating list for board " + JSON.stringify(err));
        }.bind(this)
      }
    );
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







// horello.loadData = function(board_id){
//   var listOfLists; 
//   // Part 1
//   console.log("Part 1")
//   $.ajax(horello.apiUrl + "/board/" + board_id + "/lists",
//      data: { //parameter that holds the info getting passed to the API 
//       key: horello.apiKey, 
//       token: horello.apiToken }, 
//      method: "GET",  //method is a parameter
     
//   // Part 3
//    console.log("Part 3")
//      success: function(response){
//       listOfLists = response; 
//       console.log(JSON.stringify(response));
//      }
//      error: function(err){
//       console.log(JSON.stringify(err)); 
//      }
//      )
//    console.log("Part 2")
//   // Part 2
//     var realLists = _.map(listOfLists, horello.List.fromJSON); 





















