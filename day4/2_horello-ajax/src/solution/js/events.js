// This is where you will be writing your AJAX events to perform
// certain actions.
function createList(listName) {
  $.ajax(apiUrl + "/lists", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function (list) {
      console.log("Successfully created list with ID " + list.id + " for board " + boardId);
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error creating list for board " + boardId + ": " + JSON.stringify(err));
    }.bind(this)
  });
}

function createCard(name, listId) {
  $.ajax(apiUrl + "/cards", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId
    },
    success: function (data) {
      console.log("Successfully created new card: " + JSON.stringify(data));
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error creating new card: " + JSON.stringify(err));
    }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax(apiUrl + "/cards/" + cardId, {
    method: "PUT",
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function (data) {
      console.log("Successfully updated card " + cardId);
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error updating title of card " + cardId + ": " + JSON.stringify(err));
    }.bind(this)
  });
}
