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
// These transfer Data from api to actual objects using constructors.

horello.Board.boardFromJSON = function(data) {
  return new horello.Board(data.id);
};
horello.List.listFromJSON = function(data) {
  // YOUR CODE HERE
  return new horello.List(data.id, data.name);
};
horello.Card.cardFromJSON = function(data) {
  // YOUR CODE HERE
  return new horello.Card(data.id, data.name, data.description, data.idList);
};

///////////////////// GET THAT DATA /////////////////////

horello.Board.prototype.loadListData = function() {
  // YOUR CODE HERE

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
  // YOUR CODE HERE
  $.ajax(horello.apiUrl + "/lists/" + this.id + "/cards", {
    data: {
      key: horello.apiKey,
      token: horello.apiToken
    },
    success: function (data2) {
      console.log("Successfully loaded cards for list " + this.id);
      this.cards = data2.map(horello.Card.cardFromJSON);
      // Re-render.
      horello.refresh(board);
    }.bind(this),
    error: function (err) {
      console.error("Error loading cards for list " + data.id + ": " + JSON.stringify(err));
    }
  });
}

///////////////////// ADD CARD AND ADD LIST /////////////////////

horello.Board.prototype.addList = function(listName) {
  // YOUR CODE HERE
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
  // YOUR CODE HERE
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
  // YOUR CODE HERE

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
  // YOUR CODE HERE

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
