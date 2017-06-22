// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  $.ajaxSetup({
    data: {
      key: apiKey,
      token: apiToken
    },
    error: function(err) {
      alert('Something went wrong! See console for more details.');
      console.log(err);
    }
  });
  setEventListeners();
  render();
  setInterval(render, 30000);
});

function createList(listName) {
  $.ajax(`https://api.Trello.com/1/lists`, {
    method: 'POST',
    data: {
      name: listName,
      idBoard: boardId
    },
    success: function(resp) {
      render();
    }
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards`, {
    method: 'POST',
    data: {
      name: name,
      idList: listId
    },
    success: function(resp) {
      render();
    }
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
    method: 'PUT',
    data: {
      name: title,
      desc: desc
    },
    success: function(resp) {
      render();
    }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/boards/${boardId}`, {
    data: {
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(listObj) {
    renderList(listObj);
  });
  board.cards.forEach(function(cardObj) {
    renderCard(cardObj);
  });
}

function renderList(list) {
  // YOUR CODE HERE
  var listWrapper = `<div class="list-container">
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
  $('#boardAnchor .board').append($(listWrapper));
}

function renderCard(card) {
  // YOUR CODE HERE
  var cardWrapper = ` <div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
                        <div class="card-body">
                          ${card.name}
                        </div>
                      </div>`;

  $(`#${card.idList} .list-cards`).append(cardWrapper);
}
