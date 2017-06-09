// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
var apiKey = "a4e169e98bc36999eb008741d226688d";
var apiToken = "36a06a12fa85a8fcfe670c7e9d3ee77f91291bb0ec47216b3ce11c10edfd6b50";
var apiUrl = "https://trello.com/b/MuVOyMZ3/maggie-horello";
var boardId = "5939cf31e654e91ab9611c0c";

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    url: 'https://api.Trello.com/1/lists/' ,
      method: "POST",
      data: {
        idBoard: boardId,
        key: apiKey,
        token: apiToken,
        name: listName
      },
      success: function(data){
        render();
      },
      error: function(err){
        console.log("err", err);
      }
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    url: 'https://api.Trello.com/1/cards/' ,
    method: "POST",

    data: {
      idBoard: boardId,
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId
    },
    success: function(data) {
      render();
    },
    error: function(err){
      console.log('err' + err);
    }
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    url: "https://api.Trello.com/1/cards/" + cardId,
    method: "PUT",

    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc,
    },
    success: function(data){
      render();
    },
    error: function(err) {
      console.log("Error" + err);
    }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939cf31e654e91ab9611c0c', {
    data: {
      key: "a4e169e98bc36999eb008741d226688d",
      token: "36a06a12fa85a8fcfe670c7e9d3ee77f91291bb0ec47216b3ce11c10edfd6b50",
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
  var newBoard = `<div id="${boardId}" class="board"></div>`;
  $('#boardAnchor').append(newBoard);
  for (var i = 0; i < board.lists.length; i++) {
    renderList((board.lists[i]));
  }
  for (var i = 0; i < board.cards.length; i++) {
    renderCard((board.cards[i]));
  }
}

function renderList(list) {
  // YOUR CODE HERE
  var newList = `<div class="list-container">
  <div class="list" data-list-id= ${list.id} id=${list.id}>
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=${list.id}>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id= "addCardTitle" + ${list.id} />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn" + ${list.id}>Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`;
$('#'+ boardId).append(newList);
}

function renderCard(card) {
  // YOUR CODE HERE

  var newCard = (`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`)
// console.log(card.idList);
$('#' + card.idList + ' .list-cards').append(newCard);
}
