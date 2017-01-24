"use strict";
window.horello = window.horello || {};

///////////////////// CONSTRUCTORS /////////////////////

horello.Board = function (id) {
  this.id = id;
  this.lists = [];
};
horello.List = function(id, name) {
  this.id = id;
  this.name = name;
  this.cards = [];
};
horello.Card = function(id, title, desc, listId) {
  this.id = id;
  this.listId = listId;
  this.title = title;
  this.desc = desc;
};

///////////////////// STATIC OBJECT CREATORS /////////////////////
// These transfer Data from api to  actual objects using constructors.
// TODO: STUDENTS SHOULD IMPLEMENT THESE

horello.Board.boardFromJSON = function(data) {
  return new horello.Board(data.id);
};
horello.List.listFromJSON = function(data) {
  return new horello.List(data.id, data.name);
};
horello.Card.cardFromJSON = function(data) {
  return new horello.Card(data.id, data.name, data.desc, data.idList);
};

/////////////////////////////////////////////////
///////////////////// BOARD /////////////////////
/////////////////////////////////////////////////

horello.Board.prototype = {
  loadListData: function() {
    // This is the calling point from index.js.
    // Brings in an array of lists.
    // Clears board's list array.
    // CALLS horello.List.listFromJSON(data2); This creates a LIST object from every
    // element in the array, pushes it into the board's list array. and:
    //loadsData -> loadsCards -> Mounts the board

    $.ajax(horello.apiUrl + "/boards/" + this.id + "/lists", {
      data: {
        key: horello.apiKey,
        token: horello.apiToken
      },
      success: function (data) {
        console.log("Successfully loaded lists for board " + this.id);
        this.lists = data.map(function(listData){
          return horello.List.listFromJSON(listData)
        });
        this.lists.forEach(function (list) {
          list.loadCards();
        });
      }.bind(this),
      error: function (err) {
        console.error("Error loading lists for board " + this.id + ": " + JSON.stringify(err));
      }.bind(this)
    }
  );
},


addList: function(listName) {
  // YOUR CODE HERE
  //THIS SHOULD POST TO TRELLO /lists
  // calls   this.loadListData(); on success, the one below that in time
  //         loadsData -> loadsCards -> Mounts the board

  /*
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
console.log("Successfully created list with ID " + data.id + " for board " + this.id);
this.loadListData();
}.bind(this),
error: function (err) {
console.error("Error creating list for board " + this.id + ": " + JSON.stringify(err));
}.bind(this)
}
);
*/
}

// DELETE THIS > LOOKS LIKE THIS ISNT USED
// getList: function(listId) {
//   // DO WE NEED THIS? PROBABLY BEING GET AT  LOADDATA
//   return this.lists.find(function(c) {
//     return (c.id == listId);
//   });
// },
};


/////////////////////////////////////////////////
///////////////////// LIST /////////////////////
/////////////////////////////////////////////////

horello.List.prototype = {
  loadCards: function() {
    // YOUR CODE TO IMPORT CARDS
    // is being called once for every board
    $.ajax(horello.apiUrl + "/lists/" + this.id + "/cards", {
      data: {
        key: horello.apiKey,
        token: horello.apiToken
      },
      success: function (data2) {
        console.log("Successfully loaded cards for list " + this.id);
        this.cards = data2.map(horello.Card.cardFromJSON);
        // Re-render.
        horello.mount(board);
      }.bind(this),
      error: function (err) {
        console.error("Error loading cards for list " + data.id + ": " + JSON.stringify(err));
      }
    });
  },

  addCard: function(name, desc) {
    // YOUR CODE HERE TO POST TO TRELLO
    // First create the data in the API? WHAT?
    // on success call       this.loadCards();
    /*
    $.ajax(horello.apiUrl + "/cards", {
    method: "POST",
    data: {
    key: horello.apiKey,
    token: horello.apiToken,
    name: name,
    desc: desc,
    idList: this.id
  },

  success: function (data) {
  // Success! Now we have an ID and we can create it locally. Or,
  // we can reload the data from the API.
  console.log("Successfully created new card: " + JSON.stringify(data));
}.bind(this),
error: function (err) {
console.error("Error creating new card: " + JSON.stringify(err));
}
});
*/
},

getCard: function(cardId) {
  /*
  // WHAT IS THIS?? GET FROM WHERE? WHY DO WE need this.
  var card = this.cards.filter(function(c) {
  return (c.id == cardId);
});
if (card.length > 0) {
return card[0];
}
return null;
*/
}

};




/////////////////////////////////////////////////
///////////////////// CARD /////////////////////
/////////////////////////////////////////////////

horello.Card.prototype = {

  setTitle: function(titleStr) {
    // YOUR CODE TO PUT TO TRELLO and UPDATE CARDS
    /*
    this.title = titleStr;
    $.ajax(horello.apiUrl + "/cards/" + this.id, {
    method: "PUT",
    data: {
    key: horello.apiKey,
    token: horello.apiToken,
    name: titleStr
  },
  success: function (data) {
  console.log("Successfully updated title of card " + this.id);
}.bind(this),
error: function (err) {
console.error("Error updating title of card " + this.id + ": " + JSON.stringify(err));
}.bind(this)
});
*/
},

getDescription: function() {
  return this.desc;
},

setDescription: function(desc) {
  // YOUR CODE TO PUT TO TRELLO, probs when updating a description??
  /*
  this.desc = desc;
  $.ajax(horello.apiUrl + "/cards/" + this.id, {
  method: "PUT",
  data: {
  key: horello.apiKey,
  token: horello.apiToken,
  desc: desc
},
success: function (data) {
console.log("Successfully updated desc of card " + this.id);
}.bind(this),
error: function (err) {
console.error("Error updating desc of card " + this.id + ": " + JSON.stringify(err));
}.bind(this)
});
*/
}

};




///////////////////// RENDERERS /////////////////////




horello.Board.prototype.render = function() {
  var wrapper = $('<div id="board" class="board"></div>');
  wrapper.html(this.lists.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper;
},

horello.List.prototype.render = function() {
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
};


horello.Card.prototype.render = function() {
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
};
