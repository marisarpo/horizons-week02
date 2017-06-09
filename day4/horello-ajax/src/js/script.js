// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();

  //add a x button on cards
  var xButton = $('<button type="button" class="btn btn-default">x</button>')
  $('.card').append(xButton);

  $.ajaxSetup({
    url: 'https://api.Trello.com/1/boards/' + boardId,
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    }
  })
  setInterval(function () {
    $.ajax({
      success: function (data) {
        renderBoard(data);
      }
    })
  }, 30000);
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/lists/', {
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId
    },
    success: function() { render(); },
    error: function(e) {
      console.log(e);
    }
  });
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards', {
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId,
      idBoard: boardId
    },
    success: function() { render(); },
    error: function(e) {
      console.log('error', e);
    }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: 'PUT',
    data: {
      key: "567679872ed1b2e3e8e55702650ca6da",
      token: "5dda9370d2f8f73e0380f24891e06fb608bc29aa557ff023878dec3276e4ac21",
      name: title,
      desc: desc,
      idBoard: "5939b28daa4dfadee2edaccb"
    },
    success: function() { render(); }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939b28daa4dfadee2edaccb', {
    data: {
      key: "567679872ed1b2e3e8e55702650ca6da",
      token: "5dda9370d2f8f73e0380f24891e06fb608bc29aa557ff023878dec3276e4ac21",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) { renderBoard(data); }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="' + boardId + '" class="board"></div>');
  for (var i = 0; i < board.lists.length; i++) {
     renderList(board.lists[i]);
  }
  for (var j = 0; j < board.cards.length; j++) {
     renderCard(board.cards[j]);
  }
}

function renderList(list) {
  // YOUR CODE HERE
  var list_container = '<div class="list-container"> <div class="list" data-list-id="' + list.id + '" id="' + list.id + '"> <div class="list-header"> <span class="list-title">' + list.name + '</span> </div> <div class="list-cards"></div> <div class="list-footer"> <button class="add-card" addcardid="' + list.id + '">Add a card...</button> <div class="collapse add-card-form-wrapper" id="addCardForm' + list.id + '"> <div class="well add-card-form"> <input type="text" class="form-control" placeholder="Card title" id="addCardTitle' + list.id + '" /> <button type="button" class="btn btn-default add-card-save" id="addCardBtn' + list.id + '">Save</button> <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn' + list.id + '"></span></button> </div> </div> </div> </div> </div>';
  $('#boardAnchor .board').append(list_container);
}

function renderCard(card) {
  // YOUR CODE HERE
  var card_container = '<div id="' + card.id + '" class="card" data-card-desc="' + card.desc + '" data-card-name="' + card.name + '" data-list-id="' + card.idList + '" data-card-id="' + card.id + '"> <div class="card-body"> ' + card.name + '</div> </div>';
 $('#' + card.idList + ' .list-cards').append(card_container);
}
















