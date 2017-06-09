// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/lists/', {
  data: {
    key: apiKey,
    token: apiToken,
    name: listName,
    idBoard: boardId,
  },
  method: "POST",
  success: function(e){
    render();
  }
});
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards/', {
  data: {
    key: apiKey,
    token: apiToken,
    name: name,
    idList: listId,
  },
  method: "POST",
  success: function(e){
    render();
  }
});
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/'+cardId, {
  data: {
    key: apiKey,
    token: apiToken,
    name: title,
    desc: desc,
    cardId: cardId,
  },
  method: "PUT",
  success: function(e){
    render();
  }
});
}

function render() {

  $.ajax('https://api.Trello.com/1/boards/'+boardId, {
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
  $('.list-container:not(:last-child)').empty();
  //$('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="boardId" class="board"></div>');
  (board.lists).forEach(function(item){
    console.log("YE");
    renderList(item);
  });
  (board.cards).forEach(function(card){
    console.log("YOP");
    renderCard(card);
  });
}

function renderList(list) {
  $('#boardAnchor').after('<div class="list-container"><div class="list" data-list-id='+list.id+' id='+list.id+'><div class="list-header"><span class="list-title">'+list.name+'</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card" addcardid='+list.id+'>Add a card...</button><div class="collapse add-card-form-wrapper" id="addCardForm'+list.id+'"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+list.id+'" /><button type="button" class="btn btn-default add-card-save" id="addCardBtn'+list.id+'">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn' + list.id +'"></span></button></div></div></div></div></div>');
}

function renderCard(card) {
  console.log('#'+card.idList);
  $('#'+card.idList).children('.list-cards').append('<div id='+card.id+'" class="card" data-card-desc='+card.desc+'data-card-name='+card.name+'" data-list-id='+card.idList+' data-card-id='+card.id+'><div class="card-body">'+card.name+'</div></div>');
}
