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
  $.ajax('https://api.Trello.com/1/boards/5939bd6e80ce19e125eee2d0', {
    data: {
      key: "473c8959dec7c114f358e9a358e6b445",
      token: "a579a26caa7ba252f20cd9293fad5971a221c9a43281352ccd7b069869f51b5d",
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
  $("#boardAnchor").empty();

}

function renderList(list) {
  // YOUR CODE HERE
}

function renderCard(card) {
  // YOUR CODE HERE
}
