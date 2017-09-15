// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax(apiUrl + "/lists/", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId
    },
    success: function(){
      render();
    }
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(apiUrl + "/cards/", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId,
      idBoard: boardId
    },
    success: function(){
      render();
    }
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(apiUrl + "/cards/" + cardId, {
    method: "PUT",
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function(){
      render();
    }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/59bb19463c4921362e97d44e', {
    data: {
    key: apiKey,
    token: apiToken,
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
  board.lists.forEach(function(l){
    renderList(l);
  });
  board.cards.forEach(function(c){
    renderCard(c);
  });
}

function renderList(list) {
  // YOUR CODE HERE
  var pasted = `<div class="list-container">
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
</div>`
$('#' + list.idBoard).append(pasted);
}

function renderCard(card) {
  // YOUR CODE HERE
  var pasteagain = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`
$('#' + card.idList).find('.list-cards').append(pasteagain);
}
