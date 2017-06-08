// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function () {
  $.ajaxSetup({
    data: {
      key: apiKey,
      token: apiToken,
    }
  })
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/lists/', {
    method: "POST",
    data: {
      // key: apiKey,
      // token: apiToken,
      idBoard: boardId,
      name: listName,
    },
    success: function (data) {
      render();
    }
  });
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards/', {
    method: "POST",
    data: {
      // key: apiKey,
      // token: apiToken,
      idList: listId,
      name: name,
    },
    success: function (data) {
      render();
    }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: "PUT",
    data: {
      // key: apiKey,
      // token: apiToken,
      name: title,
      desc: desc,
    },
    success: function (data) {
      render();
    }
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939bfa5ffe598ab8f9f7c86', {
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function (data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="${' + boardId + '}" class="board"></div>');
  for (var i = 0; i < board.lists.length; i++) {
    renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++) {
    renderCard(board.cards[i]);
  }
}

function renderList(list) {

  $('#boardAnchor .board').append(`<div class="list-container">
  <div class="list" data-list-id="` + list.id + `" id="` + list.id + `">
    <div class="list-header">
      <span class="list-title">` + list.name + `</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="` + list.id + `">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm` + list.id + `">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle` + list.id + `" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn` + list.id + `">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn` + list.id + `"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`);
}

function renderCard(card) {
  $(`<div id="` + card.id + `" class="card" data-card-desc="` + card.desc + `" data-card-name="` + card.name + `" data-list-id="` + card.idList + `" data-card-id="` + card.id + `">
  <div class="card-body">
    ` + card.name + ` <button class="delete"><span class="glyphicon glyphicon-remove"></span></button>
  </div>
</div>`).insertBefore('#' + card.idList + ' .list-footer');
}

function deleteCard(cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: "DELETE",
    success: function (data) {
      render();
    }
  });
}
