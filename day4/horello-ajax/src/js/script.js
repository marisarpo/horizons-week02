// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render($.ajax('https://api.Trello.com/1/boards/5939c8404e32721f00f0f80b', {
    data: {
      key: "88a6ced894ec2951795d890bfa709660",
      token: "adbcaeda9030b5215af9e450b5b9fa0cd1bd5238e0c000141d19905ed4af6f35",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  }));
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
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);

  // YOUR CODE HERE
}

function renderList(list) {
  // YOUR CODE HERE
}

function renderCard(card) {
  // YOUR CODE HERE
}
