// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

setInterval(function() { render(); }, 30000);

$(document).ready(function() {
  setEventListeners();
  render();
});

$.ajaxSetup({
  data: {
    key: apiKey,
    token: apiToken
  }
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    url: "https://api.trello.com/1/lists",
    method: 'post',
    data: {
    //  key: apiKey,
    //  token: apiToken,
      name: listName,
      idBoard: boardId
    },
    success: function(resp) {
      render();
    },
    error: function(err) {
      alert("Whoops! List could not be created");
    }
  })
}

function createCard(myName, listId) {
  // YOUR CODE HERE
  $.ajax({
    url: "https://api.trello.com/1/cards",
    method: 'post',
    data: {
    //  key: apiKey,
    //  token: apiToken,
      name: myName,
      idList: listId
    },
    success: function(resp) {
      render();
    },
    error: function(error) {
      alert('Whoops! Card could not be created');
    }
  })
}

function updateCard(myTitle, myDesc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    url: "https://api.trello.com/1/cards/" + cardId,
    method: "put",
    data: {
    //  key: apiKey,
    //  token: apiToken,
      name: myTitle,
      desc: myDesc,
    },
    success: function(resp) {
      render();
    },
    error: function(err) {
      alert("Whoops! Card could not be updated");
      render();
    }
  })
}

function deleteCard(cardId) {
  $.ajax({
    url: "https://api.trello.com/1/cards/" + cardId,
    method: "delete",
    success: function(resp) {
      render();
    },
    error: function(err) {
      alert("Whoops! Card could not be deleted!");
      render();
    }
  })
}

function archiveList(listId) {
  $.ajax({
    url: "https://api.trello.com/1/lists/" + listId,
    method: "put",
    data: {
      closed: true,
    },
    success: function(resp) {
      render();
    }
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/' + boardId, {
  data: {
  //  key: apiKey,
  //  token: apiToken,
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data); }
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(list) {
    renderList(list);
  });
  board.cards.forEach(function(card) {
    renderCard(card);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var string = `<div class="list-container">
  <div class="list" data-list-id="${list.id}" id="${list.id}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
      <span class="glyphicon glyphicon-remove remove-list"></span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list.id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  if (!list.closed) {
    $('#' + boardId).append($(string));
  }
}

function renderCard(card) {
  // YOUR CODE HERE
  var string = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <span class="glyphicon glyphicon-remove delete-card"></span><div class="card-body">${card.name}</div>
</div>`;
  $('#' + card.idList + " .list-cards").append($(string));
}
