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
  $.ajax('https://api.Trello.com/1/boards/XFlmJ2fn', {
    data: {
    key: "285474f7723cd7b77d822f6a40db27b5",
    token: "ce8a29a04011dcbb119bacc543f19bd847a4324883d9fcc0bb336b22d1360a70",
    cards: 'all',
    lists: 'all'
    },
    success: function(resp) {
      renderBoard(resp);
    }
  }
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#board').empty();
  $('#board').append(`<div id="${boardId}" class="board"></div>`);
  // for (var i=0; i<board.lists.length; i++) {
  //   renderList(board.lists:nth-of-type[i]);
  //   console.log('IN')
  // }
  // for (var i=0; i<board.cards.length; i++) {
  //   renderList(board.cards[i]);
  // }
  board.lists.forEach(function(list){renderList(list)});
  board.cards.forEach(function(card){renderCard(card)});
}

function renderList(list) {
  // YOUR CODE HERE
  $('#list').
}

function renderCard(card) {
  // YOUR CODE HERE
}
