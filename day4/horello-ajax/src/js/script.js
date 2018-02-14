// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}`,
    method: 'POST',
    data: {
      key: "a8da787bf432963c5cad6f17800755b0",
      token: "d80ca8b08b485e1bae9526bc519de716059e3960a8a5e692ddcd577564f48d0b",
      name: listName,
    },
    success: function(data) {
      render(data)
    }
  });
  // YOUR CODE HERE
}

function createCard(name, listId) {
  $.ajax({
    url: `https://api.trello.com/1/cards?idList=${listId}`,
    method: 'POST',
    data: {
      key: "a8da787bf432963c5cad6f17800755b0",
      token: "d80ca8b08b485e1bae9526bc519de716059e3960a8a5e692ddcd577564f48d0b",
      idList: listId,
      name: name,
    },
    success: function(data) {
      render(data)
    }
  });
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url: `https://api.trello.com/1/cards/${cardId}`,
    method: 'PUT',
    data: {
      key: "a8da787bf432963c5cad6f17800755b0",
      token: "d80ca8b08b485e1bae9526bc519de716059e3960a8a5e692ddcd577564f48d0b",
      name: title,
      desc: desc
    },
    success: function(data) {
      render(data)
    }
  });
  // YOUR CODE HERE
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5a6a62753448dddc79c88876', {
    data: {
      key: "a8da787bf432963c5cad6f17800755b0",
      token: "d80ca8b08b485e1bae9526bc519de716059e3960a8a5e692ddcd577564f48d0b",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data)
    }
  })// YOUR CODE HERE
}

function renderBoard(board) {
  $('.list-container').empty();
  $('#boardAnchor').append(`<div id= "${boardId}" class = "${board}"></div>`)
  board.lists.forEach(function(item) {
    renderList(item);
  })
  board.cards.forEach(function(item) {
    renderCard(item);
  })
  // YOUR CODE HERE
}

function renderList(list) {
  var string = `<div class="list-container">
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
  $('#boardAnchor').before(string);
  // YOUR CODE HERE
}

function renderCard(card) {
  var string = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
        <div class="card-body">
          ${card.name}
        </div>
      </div>`
  $("#" + card.idList).find('.list-cards').append(string);
  // YOUR CODE HERE
}
