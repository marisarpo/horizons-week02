// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/lists/', {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId
    },
    success: function (list) {
      render();
    }
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards/', {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId
    },
    success: function (card) {
      render();
    }
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  // Make an AJAX PUT request to the /cards endpoint to update the card's title and description.

  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: "PUT",
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function (data) {
      render();
    }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5b19bba541bbe41edba05573', {
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      // pass the data object to the renderBoard function
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(item) {
    renderList(item);
  })

  board.cards.forEach(function(item) {
    renderCard(item);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var item = `<div class="list-container">
  <div class="list" data-list-id="${list["id"]}" id="${list["id"]}">
    <div class="list-header">
      <span class="list-title">${list["name"]}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list["id"]}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list["id"]}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list["id"]}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list["id"]}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list["id"]}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`

  $('#' + boardId).append($(item));
}

function renderCard(card) {
  // YOUR CODE HERE
  var item = `<div id="${card["id"]}" class="card" data-card-desc="${card["desc"]}" data-card-name="${card["name"]}" data-list-id="${card["idList"]}" data-card-id="${card["id"]}">
  <div class="card-body">
    ${card["name"]}
  </div>
</div>`;
  var obj = $(item);
  $('#' + card.idList).find('.list-cards').append(obj);

}
