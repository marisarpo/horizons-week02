// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
var apiKey = "ddbf2e4620bfee2f1082c7bb70b8f4cf";
var apiToken = "58c1f29dbb5b98dff6f4af7ef8e9445489558842ddc28ee8c71c528e10e93432";
var apiUrl = "https://api.trello.com/1";
var boardId = "5939c8b9748534cadad2b394";

$(document).ready(function() {
  $.ajaxSetup({
    data: {
    token: apiToken,
    key: apiKey
    // idBoard: boardId
  }
  })
  setInterval(render, 10000);

  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: 'https://api.trello.com/1/lists',
    method: 'POST',
    data: {
      name: listName,
      idBoard: boardId
    },
    success: function(){
      render();
    },
    error: function(error){
    console.log(error)
    }
  })
}

function createCard(name, listId) {
  $.ajax({
    url: 'https://api.trello.com/1/card',
    method: 'POST',
    data: {
      name: name,
      idList: listId
    },
    success: function(){
      render();
    },
    error: function(error){
    console.log(error)
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url: 'https://api.trello.com/1/cards/' + cardId,
    method: 'PUT',
    data: {
      name: title,
      desc: desc
    },
    success: function(){
      render();
    },
    error: function(error){
    console.log(error)
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939c8b9748534cadad2b394', {
  data: {
    key: apiKey,
    token: apiToken,
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data);
  },
  error: function(error){
    console.log(error);
  }

});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  var str = `<div id="${boardId}" class="board"></div>`;
  $('#boardAnchor').append(str);
  for(var i = 0; i < board.lists.length; i++){
    renderList(board.lists[i]);
  }

  for(var i = 0; i < board.cards.length; i++){
    renderCard(board.cards[i]);
  }
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
</div>`

$('#' + boardId).append(newList);

}

function renderCard(card) {
  var newCard = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
  ${card.name}
  </div>
</div>`
  $('#' + card.idList + ' .list-cards').append(newCard);
}
