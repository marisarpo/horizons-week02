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
  $.ajax('https://api.Trello.com/1/boards/593ae5ea476511fd2bd1cd5e', {
    data: {
      key: "c9e201616c4667de6d8ef585b6cb5c75",
      token: "b9f2352f8900ede2a8259c3cc963e44e9c495251d03688a05bead2d0d62fe364",
      cards: 'all',
      lists: 'all'
    },
    success: function(resp) {
      renderBoard(resp);
    }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
}

function renderList(list) {
  // YOUR CODE HERE
}

function renderCard(card) {
  // YOUR CODE HERE
}
