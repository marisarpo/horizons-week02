// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax(`https://api.Trello.com/1/lists/`, {
  method:'post',
  data: {
    key: "a7f2403f531722115340284a7fd4a23f",
    token: "f933862f046ad6f59d970fa03e01c09332c7a3cb0eaaa1a4e05f6292b7f0216c",
    name: listName,
    idBoard: boardId
  },
  success: render
  });
}

function createCard(name, listId) {
  $.ajax(`https://api.Trello.com/1/cards/`, {
  method:'post',
  data: {
    key: "a7f2403f531722115340284a7fd4a23f",
    token: "f933862f046ad6f59d970fa03e01c09332c7a3cb0eaaa1a4e05f6292b7f0216c",
    name: name,
    idList: listId
  },
  success: render
  });
}

function updateCard(title, desc, cardId) {
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
  method:'put',
  data: {
    key: "a7f2403f531722115340284a7fd4a23f",
    token: "f933862f046ad6f59d970fa03e01c09332c7a3cb0eaaa1a4e05f6292b7f0216c",
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
  success: function(data) { renderBoard(data); }
});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(list){renderList(list);});
  board.cards.forEach(function(card){renderCard(card);});
}

function renderList(list) {
  if(list.closed){return false;}
  var listId = list.id;
  var listName = list.name;
  $(`#${boardId}`).append(`<div class="list-container">
  <div class="list" data-list-id="${listId}" id="${listId}">
    <div class="list-header">
      <span class="list-title">${listName}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${listId}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${listId}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${listId}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${listId}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${listId}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`);
}

function renderCard(card) {
  if(card.closed){return false;}
  var cardId = card.id;
  var cardName = card.name;
  var cardDesc = card.desc;
  var listId = card.idList;
  $(`#${listId}`).find(".list-cards").append(`<div id="${cardId}" class="card" data-card-desc="${cardDesc}" data-card-name="${cardName}" data-list-id="${listId}" data-card-id="${cardId}">
  <div class="card-body">
    ${cardName}
  </div>
</div>`);
}
