// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    url: apiUrl + '/lists',
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function(){
      render();
    }.bind(this)
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    url: apiUrl + '/cards',
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId,
    },
    success: function(){
      render();
    }.bind(this)
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    url: apiUrl + '/cards/' + cardId,
    method: 'PUT',
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function(){
      render();
    }.bind(this)
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax(apiUrl + '/boards/' + boardId, {
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    },
    headers: {
      "Authorization": "Basic " + btoa(apiKey + ":" + apiToken)
    },
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(list){
    renderList(list);
  });
  board.cards.forEach(function(card){
    renderCard(card);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  $('.board').append(`<div class="list-container">
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
</div>`)
}

function renderCard(card) {
  // YOUR CODE HERE
  $('#'+card.idList).find('.list-cards').append(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`)
}
