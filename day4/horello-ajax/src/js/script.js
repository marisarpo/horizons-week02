// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

setInterval(render, 30000);

$.ajaxSetup({
  data: {
    key: apiKey,
    token: apiToken
  },
  success: function() {
    render();
  }
})

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    method: 'POST',
    url: `${apiUrl}/lists/`,
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
    url: `${apiUrl}/cards/`,
    data: {
      name: name,
      idList: listId
    }
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    method: 'PUT',
    url: `${apiUrl}/cards/${cardId}`,
    data: {
      id: cardId,
      name: title,
      desc: desc
    }
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax(`${apiUrl}/boards/${boardId}`, {
    data: {
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
  board.lists.forEach(function(list) { renderList(list); })
  board.cards.forEach(function(card) { renderCard(card); })
}

function renderList(list) {
  // YOUR CODE HERE
  if (list.closed) { return; }
  var html = `<div class="list-container">
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

  $(`#${boardId}`).append(html);
}

function renderCard(card) {
  // YOUR CODE HERE
  if (card.closed) { return; }
  var html = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">${card.name}</div>
  </div>`;

  $(`#${card.idList}`).children('.list-cards').append(html);
}
