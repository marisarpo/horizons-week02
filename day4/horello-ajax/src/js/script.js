// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

$.ajaxSetup({ // TODO: Why does render() need it?!?!?
  key: apiKey,
  token: apiToken
})

function createList(listName) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/lists`, {
  method: "post",
  data: {
    name: listName,
    idBoard: boardId
  },
  success: render
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards`, {
  method: "post",
  data: {
    name: name,
    idList: listId
  },
  success: render
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
  method: "put",
  data: {
    name: title,
    desc: desc
  },
  success: render
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/59bb0ae01a7a617542128ebe', {
  data: {
    key: "a7f2403f531722115340284a7fd4a23f",
    token: "f933862f046ad6f59d970fa03e01c09332c7a3cb0eaaa1a4e05f6292b7f0216c",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data) }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(renderList);
  board.cards.forEach(renderCard);
}

function renderList(list) {
  // YOUR CODE HERE
  if (list.closed === false) {
    $(`#${boardId}`).append(`<div class="list-container">
    <div class="list" data-list-id="${list.id}" id="${list.id}">
    <div class="list-header">
    <span class="list-title">${list.name}</span>
    <button type="button" class="btn delete-list-button"><i class="glyphicon glyphicon-remove"></i></button>
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
    </div>`)
  }
}

function renderCard(card) {
  // YOUR CODE HERE
  if (card.closed === false) {
    $(`#${card.idList}`).find('.list-cards').append(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
    <div class="card-body"><button type="button" class="btn btn-default delete-card-button"><i class="glyphicon glyphicon-remove"></i></button>
    ${card.name}
    </div>
    </div>`);
  }
}

setInterval(render, 30000) // Bonus: 7b


// Bonus: 8a - delete card
$('.board').on('click', '.delete-card-button', function() {
  deleteCard($(this).parents('div.card').attr('id'));
})
// TODO: WHY ISNIT IT WORKING :(
function deleteCard(cardId) {
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
    method: "delete",
    success: render,
    error: function(err) {
      console.log("error:", err)
    }
  });
}

// Bonus: 8b - delete list
$('.board').on('click', '.delete-list-button', function() {
  deleteList($(this).closest('div.list').attr('id'));
})
function deleteList(listId) {
  $.ajax(`https://api.Trello.com/1/lists/${listId}/closed`, {
    method: "put",
    success: render,
    error: function(err) {
      console.log("error:", err, `https://api.Trello.com/1/lists/${listId}/closed`)
    }
  });
}
