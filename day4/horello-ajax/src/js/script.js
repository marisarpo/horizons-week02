// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function () {
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
  $.ajax('https://api.Trello.com/1/boards/5939d1237c536132813ceade', {
    data: {
      key: "1a70a892bebee4ea31f6ab4a9684189f",
      token: "512c4b07db6cc293c1307bb61b095af3d218485b64eb4512932e9d66d49fec96",
      cards: 'all',
      lists: 'all'
    },
    success: function (data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  console.log(board);
  console.log(board.lists);
  $("#boardAnchor").empty();
  $("#boardAnchor").append('<div id="boardId" class="board"></div>');
  var theLists = board.lists;
  theLists.forEach(function(element) {
    renderList(element);
  });
  var theCards = board.cards;
  theCards.forEach(function(element) {
    renderCard(element);
  });
}

function renderList(list) {
  // YOUR CODE HERE
}

function renderCard(card) {
  // YOUR CODE HERE
}
