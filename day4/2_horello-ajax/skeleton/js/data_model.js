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
horello.Card = function(id, title, description, listId) {
  this.id = id;
  this.listId = listId;
  this.title = title;
  this.description = description;
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
  return new horello.Card(data.id, data.name, data.description, data.idList);
};

///////////////////// GET THAT DATA /////////////////////

horello.Board.prototype.loadListData = function() {
  // This is the calling point from index.js.
  // loadListData -> loadsCards -> which Mounts the board
  $.ajax(horello.apiUrl + "/boards/" + this.id + "/lists", {
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    success: function (listData) {
      console.log("Successfully loaded lists for board " + this.id);
      // step 1 parsing the data
      this.lists = listData.map(horello.List.listFromJSON);

      // step 2. doing stuff for each card.
      // TODO: Should this be here?
      this.lists.forEach(function (list) {
        list.loadCardData();
      });
    }.bind(this),
    error: function (err) {
      conupdateCardTitleor("Error loading lists for board " + this.id + ": " + JSON.stringify(err));
    }.bind(this)
  }
);
}

horello.List.prototype.loadCardData= function() {
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
}

///////////////////// ADD CARD AND ADD LIST /////////////////////

horello.Board.prototype.addList = function(listName) {
  //THIS SHOULD POST TO TRELLO /lists
  // calls   this.loadListData(); on success, the one below that in time
  //         loadsData -> loadsCards -> Mounts the board
  console.log("Addlist")
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
  });
}

horello.List.prototype.addCard= function(name, description) {
  // THIS WORKS!
  // First create the data in the API? WHAT?
  // on success call       this.loadCardData();
  $.ajax(horello.apiUrl + "/cards", {
    method: "POST",
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
      name: name,
      description: description,
      idList: this.id
    },
    success: function (data) {
      // Success! Now we have an ID and we can create it locally. Or,
      // we can reload the data from the API.
      // TODO: EXPLAIN why this one uses loadCard and the other one calls load list.
      // This one only realoads this list, the other needs to reload the whole board.
      this.loadCardData()
      console.log("Successfully created new card: " + JSON.stringify(data));
    }.bind(this),
    error: function (err) {
      console.error("Error creating new card: " + JSON.stringify(err));
    }
  });
}

///////////////////// SET TITLE AND DESCRIPTION ON CARDS /////////////////////

horello.Card.prototype.updateCardTitle= function(titleStr) {
  // YOUR CODE TO PUT TO TRELLO and UPDATE CARDS
  // WORKS
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

},


horello.Card.prototype.setDescription=function(description) {
  // YOUR CODE TO PUT TO TRELLO, probs when updating a description??
  this.description = description;
  $.ajax(horello.apiUrl + "/cards/" + this.id, {
    method: "PUT",
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
      description: description
    },
    success: function (data) {
      console.log("Successfully updated description of card " + this.id);
    }.bind(this),
    error: function (err) {
      console.error("Error updating description of card " + this.id + ": " + JSON.stringify(err));
    }.bind(this)
  });

}

// TODO
//Archive card
// Archive list

// Move card in list
// move card between lists

// Poll server periodically.

// TODO:
// Do the renderers.

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
  if (this.description) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  }
  var cardbody = $('<div class="card-body">'+this.title+'</div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(this.title);

  return wrapper.html();
};


///////////////////// GET CARD AND LIST /////////////////////

horello.List.prototype.getCard= function(cardId) {
  // TODO: WHAT DOESTHIS DO???
  // ANY WAY OF IMPROVING??
  var card = this.cards.filter(function(c) {
    return (c.id == cardId);
  });
  if (card.length > 0) {
    return card[0];
  }  return null;
}

horello.Board.prototype.getList = function(listId) {
  // TODO: WHAT DOESTHIS DO???
  // ANY WAY OF IMPROVING??
  return this.lists.find(function(c) {
    return (c.id == listId);
  });
}
