// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document)
  .ready(function() {
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
  $.ajax('https://api.Trello.com/1/boards/593a0170acb3dc2a8a095710', {
    data: {
      key: "039daac9c1f0eb983414e8f81d521982",
      token: "c83d6de81b0a8fea52906e0955991b11c2c3bfda510b9900056fe96419b4981a",
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
  $("#boardAnchor")
    .empty()

  var newElement = $('<div>')
    .addClass('board')
    .addClass('boardId');
}

function renderList(list) {
  // YOUR CODE HERE
}

function renderCard(card) {
  // YOUR CODE HERE
}
