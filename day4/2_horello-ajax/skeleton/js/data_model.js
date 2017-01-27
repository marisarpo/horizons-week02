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

// These create objects from data.
// We are giving you the code for this one. It returns a new board based on the
// data argument we receive.
// The Board constructor only takes an id.
horello.Board.boardFromJSON = function(data) {
  return new horello.Board(data.id);
};

// The List constructor takes and id and a name.
horello.List.listFromJSON = function(data) {
  // YOUR CODE HERE
  console.log(data)
  return new horello.List(data.id, data.name);
};

// The Card constructor takes and id, a name, description and id of the list it belongs to.
horello.Card.cardFromJSON = function(data) {
  // YOUR CODE HERE
  console.log(data)
  return new horello.Card(data.id, data.name, data.desc, data.listId);
};

///////////////////// GET DATA /////////////////////

// Now we are going to get the data for the board's lists and cards.

// On this function, we do an ajax request to the /boards/ endpoint of the API.
// A request to get a board's list looks like this: "/boards/123123/lists", where
// "123123" is the boardId we got from Trello.
horello.Board.prototype.loadListData = function() {
  $.ajax(horello.apiUrl + "/boards/" + this.id + "/lists", {
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    success: function (listData) {
      console.log("Successfully loaded lists for board " + this.id);
      // Notice that we get an array the listData as a response and we are using
      // listFromJSON to parse every one of the lists and add them into the `this.lists`
      // array.
      this.lists = listData.map(horello.List.listFromJSON);

      // After adding each list to the array, we have to call `list.loadCardData();`
      // for each one, to get the cards for each list.
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

// This function works similarly to the one above, but using "list/12312/cards"
// You are on your own now to implement the code that makes the ajax request.
// On the sucess part of this function, remember map all the cards into `this.cards`,
// using `horello.Card.cardFromJSON`.
// Now we have all the data we need. So, now we call `horello.refresh(board);`
// after adding them to the array.
horello.List.prototype.loadCardData= function() {
  // YOUR CODE HERE
  $.ajax(horello.apiUrl + "/list/" + this.id + "/cards", {
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    success: function (cardData) {
      console.log("Successfully loaded lists for board " + this.id);
      // Notice that we get an array the listData as a response and we are using
      // listFromJSON to parse every one of the lists and add them into the `this.lists`
      // array.
      this.cards = cardData.map(horello.Card.cardFromJSON);

      // After adding each list to the array, we have to call `list.loadCardData();`
      // for each one, to get the cards for each list.
      // this.cards.forEach(function (card) {
      // this.loadCardData();
      // });

      horello.refresh(board);
    }.bind(this),
    error: function (err) {
      conupdateCardTitleor("Error loading lists for board " + this.id + ": " + JSON.stringify(err));
    }.bind(this)
  }
);
}

///////////////////// ADD CARD AND ADD LIST /////////////////////


// This will be your first POST request. This function gets called whenever we
// click on `addList` on the frontend. Notice that on success, we call `this.loadListData();`
// We do this to reload all the lists and show the newly added list!
// If the request fails and the card is not created, it will not show up.
horello.Board.prototype.addList = function(listName) {
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

// Implement a similar function as the one above. This one POSTS to the "/cards"
// endpoint. Remember to call `this.loadCardData()` if the request is  successful.

horello.List.prototype.addCard= function(name, description) {
  // YOUR CODE HERE
  $.ajax(horello.apiUrl + "/cards", {
    method: "POST",
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
      desc : description,
      name: name,
      idList: this.id,
      pos: 'bottom'
    },
    success: function (data) {
      console.log("Successfully created list with ID " + data.id + " for board " + this.id);
      this.loadCardData();
      horello.refresh(board);
    }.bind(this),
    error: function (err) {
      console.error("Error creating list for board " + this.id + ": " + JSON.stringify(err));
    }.bind(this)
  });
}

///////////////////// SET TITLE AND DESCRIPTION ON CARDS /////////////////////

// Updating a card looks very similar to creating one. The only real difference
// in this case is that we automatically update our UI, when someone edits the
// card by doing `this.title = titleStr`, instead of doing `this.loadCardData()`.
// Think about the two approaches and how they differ.
horello.Card.prototype.updateCardTitle= function(titleStr) {
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

// This code is similar to the one above, but posts to "/cards/cardId", remember
// to update the descrpiton after doing the request.
horello.Card.prototype.setDescription=function(description) {
  // YOUR CODE HERE
  this.title = titleStr;
  this.description = description;
  $.ajax(horello.apiUrl + "/cards/" + this.id , {
    method: "PUT",
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
      name: titleStr,
      desc: description
    },
    success: function (data) {
      console.log("Successfully updated title of card " + this.id);
    }.bind(this),
    error: function (err) {
      console.error("Error updating title of card " + this.id + ": " + JSON.stringify(err));
    }.bind(this)
  });
}
