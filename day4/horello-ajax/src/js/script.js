// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    url: 'https://api.Trello.com/1/lists/',
    data: {
      key: "71ec030867a26660a561e4171a7e11e6",
      token: "9e21895f6b4e859b69c365027f5fc2ac64b3974ec11e08c697c135c0bda1d13b",
      name: listName,
      idBoard: "593a0c392b2d50558445af1b"
    },
    method: "POST",
    success: function(data){
      render();
    }.bind(this),
    error: function(data){
      console.log("this isn't working out");
    }.bind(this)
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    url: 'https://api.Trello.com/1/cards/',
    data: {
      key: "71ec030867a26660a561e4171a7e11e6",
      token: "9e21895f6b4e859b69c365027f5fc2ac64b3974ec11e08c697c135c0bda1d13b",
      name: name,
      idList: listId
    },
    method: "POST",
    success: function(data){
      render();
    }.bind(this),
    error: function(data){
      console.log("this isn't working out");
    }.bind(this)
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    url: 'https://api.Trello.com/1/cards/'+ cardId,
    data: {
      key: "71ec030867a26660a561e4171a7e11e6",
      token: "9e21895f6b4e859b69c365027f5fc2ac64b3974ec11e08c697c135c0bda1d13b",
      name: title,
      desc: desc
    },
    method: "PUT",
    success: function(data){
      render();
    }.bind(this),
    error: function(data){
      console.log("this isn't working out");
    }.bind(this)
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/593a0c392b2d50558445af1b', {
    data: {
      key: "71ec030867a26660a561e4171a7e11e6",
      token: "9e21895f6b4e859b69c365027f5fc2ac64b3974ec11e08c697c135c0bda1d13b",
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
  $('#boardAnchor').append($('<div id="#boardId" class="board"></div>'));
  for (var i = 0; i < board.lists.length; i++) {
    renderList(board.lists[i]);
  };
  for (var i = 0; i < board.cards.length; i++) {
    renderCard(board.cards[i]);
  };
}

function renderList(list) {
  // YOUR CODE HERE
  var listyid= list.id;
  var listgen = `<div class="list-container">
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
  </div>`;
  $('#boardAnchor .board').append(listgen);
}

function renderCard(card) {
  // YOUR CODE HERE
  var cardgen = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
    <div class="card-body">${card.name}
      </div>
    </div>`;
  var listyid = '#' + card.idList + ' .list-cards';
  $(listyid).append(cardgen);
}
