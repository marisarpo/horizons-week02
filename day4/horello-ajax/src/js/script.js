// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
var boardId = "5939cb51796d3f56d5bf161b";

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
  $.ajax('https://api.Trello.com/1/boards/5939cb51796d3f56d5bf161b', {
    data: {
      key: "a69b290a4028394a10323c6563ec4077",
      token: "16b5735a3d26e333f7f4c3c30d75a7750d013619f81250b4b27bed8f95d4afb1",
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
  $('#boardAnchor').append(`<div id="5939cb51796d3f56d5bf161b" class="board"></div>`);
  for(var i = 0; i < board.lists.length; i++){
    renderList(board.lists[i]);
  }
  for(var j = 0; j < board.cards.length; j++){
    renderCar(board.cards[j]);
  }
}

function renderList(list) {
  // YOUR CODE HERE
  var listId = list.id;
  var listName = list.name;
  ('#boardAnchor').after(`
    <div class="list-container">
      <div class="list" data-list-id="` + listId + `" id="LISTIDHERE">
        <div class="list-header">
          <span class="list-title">` + listName + `</span>
        </div>
        <div class="list-cards"></div>
        <div class="list-footer">
          <button class="add-card" addcardid="` + listId + `">Add a card...</button>
          <div class="collapse add-card-form-wrapper" id="addCardForm` + listId + `">
            <div class="well add-card-form">
              <input type="text" class="form-control" placeholder="Card title" id="addCardTitle` + listId + `" />
              <button type="button" class="btn btn-default add-card-save" id="addCardBtn` + listId + `">Save</button>
              <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn` + listId + `"></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
}

function renderCard(card) {
  // YOUR CODE HERE
}
