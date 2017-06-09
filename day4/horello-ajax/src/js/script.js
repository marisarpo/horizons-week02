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
  $.ajax('https://api.Trello.com/1/boards/56224fbca6e46df7b2699888', {
    data: {
      key: '6c90f54204dd49c731b0d6f91abe3ee3',
      token: '3cb33f3696d62e33228b346773099174a38ab1a5d44b00c5e82c1dec94d8b604',
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  var boardElement = '<div id="56224fbca6e46df7b2699888" class="board"></div>';
  // console.log(board);
  $('#boardAnchor')
    .empty()
    .append(boardElement);
  for (var prop in board) {
    if (prop === "lists") {
      for (var i = 0; i < board[prop].length; i++) {
        renderList(board[prop][i]);
      }
    }
    if (prop === "cards") {
      for (var i = 0; i < board[prop].length; i++) {
        renderCard(board[prop][i]);
      }
    }
  }
}

function renderList(list) {
  //console.log(list);
  var listWrapper = $('<div class="list-container">\
    <div class="list" data-list-id=' + list.id + 'id=' + list.id + '>\
      <div class="list-header">\
        <span class="list-title">test123</span>\
      </div>\
      <div class="list-cards"></div>\
      <div class="list-footer">\
        <button class="add-card" addcardid=' + list.id + '>Add a card...</button>\
        <div class="collapse add-card-form-wrapper" id="addCardForm"' + list.id + '">\
          <div class="well add-card-form">\
            <input type="text" class="form-control" placeholder="Card title" id="addCardTitle"' + list.id + '" />\
            <button type="button" class="btn btn-default add-card-save" id="addCardBtn"' + list.id + '">Save</button>\
            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn"' + list.id + '"></span></button>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>');
  $('.board')
    .append(listWrapper);
}



function renderCard(card) {
  var cardWrapper = $('<div id=' + card.id + 'class="card" data-card-desc=' + card.description + ' data-card-name=' + card.Name + ' data-list-id=' + card.idList + ' data-card-id=' + card.id + '>\
    <div class="card-body">' + card.name + '</div> </div>');
  console.log(card.listid)
  $('#' + card.idList)
    .find('.add-card')
    .before(cardWrapper);
}
