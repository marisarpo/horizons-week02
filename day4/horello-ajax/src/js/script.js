// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

$.ajaxSetup({
  data: {
    key: apiKey,
    token: apiToken,
  },
  success: function(event) {
    render();
  }
})

var int = setInterval(render, 30000);

function createList(listName) {
  $.ajax({
    method: 'POST',
    url: apiUrl + "/lists",
    data: {
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    }
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    method: 'POST',
    url: apiUrl + "/cards/",
    data: {
      name: name,
      idList: listId
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    method: 'PUT',
    url: apiUrl + cardId,
    data: {
      name: title,
      desc: desc
    }
  })
}


function render() {
  $.ajax('https://api.Trello.com/1/boards/59bb0e32c03c20e5305960eb', {
    data: {
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
    $('#boardAnchor').empty();
    $('#boardAnchor').append('<div class = "board" id = ' + boardId + '>');
    board.lists.forEach(function(item, index) {
      renderList(item);
    })
    board.cards.forEach(function(item, index) {
      renderCard(item);
    })
}

function renderList(list) {
  if (list.closed) return;
  var newListHTML = `
    <div class="list-container">
      <div class="list" data-list-id="${list.id}" id="${list.id}">
        <div class="list-header">
          <span class="list-title">${list.name}</span>
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
    $(`#${boardId}`).append(newListHTML)
}

function renderCard(card) {
  if (card.closed) return;
  var newCardHTML = `
    <div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
      <div class="card-body">
        ${card.name}
      </div>
    </div>`;
  $(`#${card.idList}`).children('.list-cards').append(newCardHTML)
}
