// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
    $.ajax('https://api.Trello.com/1/lists', {
      method: 'POST',
      data: {
        key: "8cfea601e6762c6726b38b30bdc91c1c",
        token: "7ee7e5468707efc0899d19806721f87834a8e70234e6581cfb81e4f113c67563",
        name: listName,
        idBoard: boardId
      },
      success: function(data) {
          renderList(data);
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
      success: function(data) {
          renderCard(data);
      }
    });
}

function updateCard(title, desc, cardId) {
    $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
      method: 'PUT',
      data: {
        key: apiKey,
        token: apiToken,
        title: title,
        desc: desc,
      },
      success: function() {
          render();
      }
    });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/594c54c6bd8e11227233e027', {
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
        renderBoard(data);
    }
  });
}

function renderBoard(board) {
  var boardId = board.id;
  var newBoard = $('#boardAnchor').empty()
  var newAppend = $(`<div id="${boardId}" class="board"></div>`)
  $('#boardAnchor').append(newAppend);
  var boardLists = board.lists;
  var boardCards = board.cards;
  boardLists.forEach(function(list) {
      renderList(list);
  })
  boardCards.forEach(function(card) {
      renderCard(card);
  })
}

function renderList(list) {
  var listHTML = $(`<div class="list-container">
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
    </div>
  `)
  $(`#${list.idBoard}`).append(listHTML);
}

function renderCard(card) {
    var cardHTML = $(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
      <div class="card-body">
        ${card.name}
      </div>
    </div>
    `)
    $(`#${card.idList}`).children('.list-cards').append(cardHTML);
}
