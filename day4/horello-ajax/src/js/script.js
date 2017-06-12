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
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939dbc4260cdf5bc0245b7e', {
      data: {
        key: "3b22f74b63e9760d5893346a3b55662c",
        token: "5c65f4abf3d01b6df5ea31f46ba7489f1f1334d6844c54aebb8e7a24cdde4e0a",
        cards: 'all',
        lists: 'all'
      },
      success: function(data) {
        renderBoard(data)
      }
    });
}

function renderBoard(board) {
  // YOUR CODE HERE
  var boardId = board.id
  $('#boardAnchor').empty()
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`)
  board.lists.forEach(function(list) {
    renderList(list)
  })
  board.cards.forEach(function(card) {
    renderCard(card)
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var listId = list.id
  var listHtml = `<div class="list-container">
  <div class="list" data-list-id="${listId}" id="${listId}">
    <div class="list-header">
      <span class="list-title">test123</span>
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

var boardId = '#' + list.idBoard
$(boardId).append(listHtml)

}

function renderCard(card) {
  // YOUR CODE HERE
  var cardId = card.id
  var cardName = card.name
  var cardDescription = card.desc
  var listId = card.idList
  var cardHtml = `<div id="${cardId}" class="card" data-card-desc="${cardDescription}" data-card-name="${cardName}" data-list-id="${listId}" data-card-id="${cardId}">
  <div class="card-body">
    ${cardName}
  </div>
</div>`

  var listId2 = "#" + card.idList
  console.log(listId2)
  $(`${listId2} .list-cards`).append(cardHtml)
}
