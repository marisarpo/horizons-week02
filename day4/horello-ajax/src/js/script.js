// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax(apiUrl + '/lists/', {
    success: function(data) {
      console.log('success');
      render();
    },
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId,
    },
  });
}

function createCard(name, listId) {
  $.ajax(apiUrl + '/cards/', {
    success: function(data) {
      console.log('success');
      render();
    },
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId,
    },
  });
}

function updateCard(title, desc, cardId) {
  $.ajax(apiUrl + '/cards/' + cardId, {
    success: function(data) {
      console.log('success');
      render();
    },
    method: 'PUT',
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc,
    },
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5b19b87656e0be4cef5f556e', {
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      console.log('calling render');
      renderBoard(data); //data is a board object
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  var boardId = $(board).attr('id');
  console.log('board id is ',boardId);
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(list){
    renderList(list);
  });
  board.cards.forEach(function(card){
    renderCard(card);
  });
}

function renderList(list) {
  var listId = list.id;
  var newList = `<div class="list-container">
  <div class="list" data-list-id="${listId}" id="${listId}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
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
</div>`;
  //console.log($(`#${list.idBoard}`));
  $(`#${list.idBoard}`).append(newList);
}

function renderCard(card) {
  var newCard = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`;
  //console.log($(`#${card.idList} .list-cards`));
  $(`#${card.idList} .list-cards`).append(newCard);

}
