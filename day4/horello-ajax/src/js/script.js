// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: `https://api.trello.com/1/lists`,
    type: 'POST',
    data: {
      key: "641635cf057747eeadf506d2cc4ef3e2",
      token: "931c76d53fbfe2bbf8a43099b4b94cc0e4a4b53641978d9fd7154de00eba2b23",
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function() {
      render();
    }
  });
}

function createCard(myName, listId) {
  $.ajax({
    url: `https://api.trello.com/1/cards`,
    type: 'POST',
    data: {
      key: "641635cf057747eeadf506d2cc4ef3e2",
      token: "931c76d53fbfe2bbf8a43099b4b94cc0e4a4b53641978d9fd7154de00eba2b23",
      name: myName,
      idList: listId
    },
    success: function() {
      render();
    }
  });
}

function updateCard(myTitle, myDesc, cardId) {
  $.ajax({
    url: `https://api.trello.com/1/cards/${cardId}`,
    type: 'PUT',
    data: {
      key: "641635cf057747eeadf506d2cc4ef3e2",
      token: "931c76d53fbfe2bbf8a43099b4b94cc0e4a4b53641978d9fd7154de00eba2b23",
      name: myTitle,
      desc: myDesc
    },
    success: function() {
      render();
    }
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5b354e994c10adc41fb93a75', {
    data: {
      key: "641635cf057747eeadf506d2cc4ef3e2",
      token: "931c76d53fbfe2bbf8a43099b4b94cc0e4a4b53641978d9fd7154de00eba2b23",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${board.id}" class="board"></div>`);
  for (var i = 0; i < board.lists.length; i++) {
    //console.log('boards', board.lists[i]);
    renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++) {
    //console.log('cards', board.cards[i]);
    renderCard(board.cards[i]);
  }
}

function renderList(list) {
  var html =
    `<div class="list-container">
        <div class="list" data-list-id=${list.id} id=${list.id}>
          <div class="list-header">
            <span class="list-title">${list.name}</span>
          </div>
          <div class="list-cards"></div>
          <div class="list-footer">
            <button class="add-card" addcardid=${list.id}>Add a card...</button>
            <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
              <div class="well add-card-form">
                <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
                <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
                <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
              </div>
            </div>
          </div>
        </div>
     </div>`;
  $('#' + list.idBoard).append(html);
}

function renderCard(card) {
  var html =
    `<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
      <div class="card-body">
        ${card.name}
      </div>
    </div>`;
  $("#" + card.idList + ' .list-cards').append(html);
}
