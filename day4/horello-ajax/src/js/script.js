// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
}

function createCard(name, listId) {
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939cf01829c82e92c137013', {
  data: {
    key: 'f73092fd98be590369075b44241312ed',
    token: 'af15854cc12ad7bc4398ac644f605a3dd5ab425a232b9ff08794528597e1aebb',
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data) },
  error: function(err){
    console.log(err)
  }
});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id='${board['id']}' class="board"></div>`)

  board.lists.forEach(function(value, index) {
    renderList(value)
  })

  board.cards.forEach(function(value,index) {
    renderCard(value)
  })
  }

function renderList(list) {
  $(`#boardAnchor .board`).append(
    `<div class="list-container">
  <div class="list" data-list-id="${list['id']}" id="${list['id']}">
    <div class="list-header">
      <span class="list-title">${list['name']}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list['id']}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list['id']}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list['id']}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list['id']}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list['id']}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`
)
}

function renderCard(card) {
  $(`#${card['idList']}`).children('.list-cards').append(
  `<div id="${card['id']}" class="card" data-card-desc="${card['desc']}" data-card-name="${card['name']}" data-list-id="${card['idList']}" data-card-id="${card['id']}">
  <div class="card-body">
    ${card['name']}
  </div>
</div>`
)
console.log('here')
}
