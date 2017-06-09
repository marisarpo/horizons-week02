// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    method: 'POST',
    url: 'https://api.Trello.com/1/lists',
    data: {
      key: "9d45939de88fc8057bcb4327eb7fb91c",
      token: "10f97e7fd619feab106e1a1094a6d35dcc2cc4f5eced1bd1ade96c35ddd0c6f7",
      name: listName,
      idBoard: "5939bfb6945f2ba8fc4d2a55",
    },
    success: function(data) {
      render();
    },
    error: function(data) {
      alert('could not update!');
    }
  })
}

function createCard(name, listId) {
  $.ajax({
    method: 'POST',
    url: 'https://api.Trello.com/1/cards',
    data: {
      key: "9d45939de88fc8057bcb4327eb7fb91c",
      token: "10f97e7fd619feab106e1a1094a6d35dcc2cc4f5eced1bd1ade96c35ddd0c6f7",
      name: name,
      idList: listId,
      idBoard: "5939bfb6945f2ba8fc4d2a55",
    },
    success: function(data) {
      render();
    },
    error: function(data) {
      alert('could not update!');
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    method: 'PUT',
    url: 'https://api.Trello.com/1/cards/'+cardId,
    data: {
      key: "9d45939de88fc8057bcb4327eb7fb91c",
      token: "10f97e7fd619feab106e1a1094a6d35dcc2cc4f5eced1bd1ade96c35ddd0c6f7",
      name: title,
      desc: desc
    },
    success: function(data) {
      render();
    },
    error: function(data) {
      alert('could not update!');
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939bfb6945f2ba8fc4d2a55', {
    data: {
      key: "9d45939de88fc8057bcb4327eb7fb91c",
      token: "10f97e7fd619feab106e1a1094a6d35dcc2cc4f5eced1bd1ade96c35ddd0c6f7",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      //console.log(data);
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append($('<div id="${boardId}" class="board"></div>'));
  board.lists.forEach(function (obj) {renderList(obj)});
  board.cards.forEach(function (obj) {renderCard(obj)});
}

function renderList(list) {
  var list = `<div class="list-container">
    <div class="list" data-list-id="`+list.id+`" id="`+list.id+`">
      <div class="list-header">
        <span class="list-title">`+list.name+`</span>
      </div>
      <div class="list-cards"></div>
      <div class="list-footer">
        <button class="add-card" addcardid="`+list.id+`">Add a card...</button>
        <div class="collapse add-card-form-wrapper" id="addCardForm`+list.id+`">
          <div class="well add-card-form">
            <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+list.id+`" />
            <button type="button" class="btn btn-default add-card-save" id="addCardBtn`+list.id+`">Save</button>
            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+list.id+`"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>`
  console.log('hi1');
  $('#boardAnchor .board').append(list);
}

function renderCard(card) {
  var cardHTML =
  `<div id="`+card.id+`" class="card" data-card-desc="`+card.desc+`" data-card-name="`+card.name+`" data-list-id="`+card.idList+`" data-card-id="`+card.id+`">
    <div class="card-body">`+
      card.name
    +`</div>
  </div>`
  console.log('hi2');
  $('#' + card.idList + ' .list-cards').append(cardHTML);
}
