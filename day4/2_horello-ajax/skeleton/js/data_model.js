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

// Go to the sandbox thing and you can see the format for a board,
// but you can't see it for cards. Go to API, board, board/lists stuff. So use the below: 
// http://api.trello.com/1/boards/board#/lists?key=(key)&token=(token)

horello.Card = function(title, desc, listId) {
  // this.id = horello.generateId();
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
    $.ajax(horello.apiUrl + "/cards/" + this.getId(), {
      method: "PUT",
      data: {
        key: horello.apiKey,
        token: horello.apiToken, 
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

//also need to update this
  setDescription: function(desc) {
    $.ajax(horello.apiUrl + "/cards/" + this.getId(), {
      method: "PUT",
      data: {
        key: horello.apiKey,
        token: horello.apiToken, 
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

//TAKES ONE OF TRELLO'S RESPONSES (FRMO THAT DATA WE JUST WENT THROUGH
  //LIKE WITH THE URL STUFF) AND RETURNS A CARD 
  // TRELLO'S RESPONSE HAS TOO MUCH INFO


horello.Card.fromJSON = function(data) {

  // var newCard = new Card(newtitle, newdesc, newlistId) {
  //   newCard.id = data.id;
  //   newCard.newlistId = data.idList
  //   newCard.title = data.name;
  //   newCard.desc = data.desc;
  // };

  var card = new horello.Card(data.name, data.desc, data.idList)
  card.id = data.id;

  return card; 

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

//YOU'RE MAKING THIS 
  getData: function() {
    $.ajax(horello.apiUrl + "/lists/" + this.id + "/cards", {
      //you could also literally just copy and paste the 
      //"api.trello.com/1/boards/jfdksaljkas/lists"
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    method: "GET",
    success: function(response) {
      //This is what we want to change
      response.forEach(function(card) {
        var newCard = new horello.Card.fromJSON(card);
        board.getList(newCard.listId).cards.push(newCard);
        horello.mount(board);
      })
    }, 
    error: function(err) {
      console.log(err);
    }
  })
},

  setName: function(name) {
    this.name = name;
  },

  addCard: function(name, desc) {
    $.ajax(horello.apiUrl + "/lists/" + this.getId() + "/cards", {
      method: "POST",
      data: {
        key: horello.apiKey ,
        token: horello.apiToken, 
        name: name,
        desc: desc
      },
      success: function(response) {
        // console.log(response);
        // instead should create a new card
        // horello.Card(title, description, listId)
        var card = new horello.Card(name, desc, this.getId());
        // this is the card Id
        card.id = response.id;
        // need to add this to the list itself by pushing it to the array of cards
        this.cards.push(card);
        // now we render
        horello.mount(board);
      }.bind(this),
      error: function(err) {
        console.error(err);
      }
    });


    // this code was for a static model, not for updating the API, which is why
    // we added all that code above
    // var card = new horello.Card(name, desc, this.getId());
    // this.cards.push(card);
    // pushes card to the data model, but not the trello API
    // card constructor automatically generates ID, so we have to set
    // it to the new ID

    // return card.getId();
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
//   var newList = new List(jsonid, jsonname) {
//     newList.jsonid = data.id;
//     newList.jsonname = data.name;
//     newList.cards = [];
//     board.lists.push(newList);
//     newList.loadCards();
// };

  var list = new horello.List(data.id, data.name);
  return list;

};


// BOARD

horello.Board = function () {
  this.lists = [];
  //"this" refers to paticulat instance of board
  //so below we're referring to board.get Data
  this.getData();
};

horello.Board.prototype = {
  addList: function(listName) {
    $.ajax(horello.apiUrl + "/boards/" + "575afcaf262c0bd4a5eb066f" + "/lists", {
      method: "POST",
      data: {
        key: horello.apiKey ,
        token: horello.apiToken, 
        name: listName,
        pos: "bottom"
      },
      success: function(response) {
        //add this list to the board
        //using bind to bind it to the board. "this" after bind refers to the board.
        var newList = new horello.List(response.id, listName)
        this.lists.push(newList);
        horello.mount(board);
      }.bind(this),
      error: function(err) {
        console.error(err);
      }
    });
  },

    // This is the function that was given, for static things only
    // var list = new horello.List(listName);
    // this.lists.push(list);
    // return list.getId();

  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },


  //We added this yes yes yes

  getData: function() { //this refers to the horello.Board.prototype's getData()
    $.ajax(horello.apiUrl + "/board/" + "575afcaf262c0bd4a5eb066f" + "/lists", {
      //you could also literally just copy and paste the 
      //"api.trello.com/1/boards/jfdksaljkas/lists"
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    method: "GET",
    success: function(response) {
      // This is what we want to change
      // we want to save the lists 
      // we'll get an array so we want to loop through adding each thing
      response.forEach(function(list) {
        //instead of board.addList() we'll use fromJSON to return us 
        // a better format
        var newListVersion = horello.List.fromJSON(list)
        board.lists.push(newListVersion);
        //add object to the array now by pushing it
        //pushed all the lists but now we need to add cards
        //now we have to get the cards and add them, this referring to 
        //the list getData
        newListVersion.getData();
      });
    }, 
    error: function(err) {
      console.log(err);
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

// var sites = [
// "http://www.facebook.com",
// "http://www.google.com",
// "http://www.amazon.com",
// "http://www.airbnb.com",
// "http://www.reddit.com"]

// function ajaxCall() {
//   for (var i = 0; i < sites.length; i++) {
//   var url = sites[i++];
//   $.ajax(url, {
//     success: function() {
//       console.log("AJAX call" + i + ": I just loaded " + url);
//     }
//   });
//  }
// }
// Disable cross-origin restrictions in Safari for security things

// horello.loadData =  function(board_id) {

//   // Part 1
//   console.log("part1");
//   $.ajax(horello.apiUrl + "/board/" + board_id + "/lists", {
//     // data is what is being passed to the api
//     data: {
//       key: horello.apiKey,
//       token: horello.apiToken
//     },
//     // method is a parameter, not data being passed
//     method: "GET",
//     success: function(response) {
//       //Part 2
//       console.log("part2");
//       //takes JSON data and turns it into a string so we can look at it
//       console.log(JSON.stringify(response));
//       var realLists = _.map(response, horello.List.fromJSON); 
//       // get cards for the list using ajax (use a forEach loop)
//       $.ajax(....get cards.....) {
//         success: function (cards) {
//           // have list data
//           foreach card... {
//             var thisCard = horello.Card.fromJSON(thisCardData);

//             //RENDER THE CARD HERE because we'll render the board every time we get a new card
//           }
//         }
//       })

//     },
//     error: function(err) {
//       console.error(JSON.stringify)(err));
//     }
//   });

// // Part 3
// console.log("part 3")

// // prints out part 1, part 3, part 2. Does not happen in order. why?
// // takes time, so it does something first and then goes on to the next
// // while it's still running (because ajax takes time to run)
// }



// When we add a card we don't immediately set a description. Only edit
// dscriptions when we edit it in the modal. 
// so we do /1/lists/listid/cards
// give it method: "POST", data with key token name, and success