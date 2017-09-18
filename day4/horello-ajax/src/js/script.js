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
  $.ajax('https://api.Trello.com/1/boards/59bafe5825da186e9cabee54', {
  data: {
    key: "aa35e772e5e38389441d05fab2d9467b",
    token: "97e2568c9a8ec894db632cb02e96b8cf1c6fa9ba83d73941633f6ff74f9c396f",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data) }
});
}

function renderBoard(board) {
  $("#boardAnchor").empty();
  $("#boardAnchor").append(<div id="${boardId}" class="board"></div>);

  board.lists.forEach(function(list) {renderList(list)});
  board.cards.forEach(function(card) {renderCard(card)});
}

function renderList(list) {
  // YOUR CODE HERE
}

function renderCard(card) {
  // YOUR CODE HERE
}
