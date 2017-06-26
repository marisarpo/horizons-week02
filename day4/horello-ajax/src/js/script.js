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
  $.ajax(`https://api.Trello.com/1/boards/${boardId}`, {
  data: {
    key: "7c4fa8c895d2ac4446f1c5af9d1d2935",
    token: "b993ccb86a44059041aa8391629ded9bbc3670d4965271e91fbff8313d2acdba",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data)}
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  console.log("board: ", board);
  $('#boardAnchor').empty();
  $('#boardAnchor').append($(`<div id="${boardId}" class="board"></div>`));
  board.lists.forEach(function(elem) {
    renderList(elem);
  });
  board.cards.forEach(function(elem) {
    renderCard(elem);
  });
}

function renderList(list) {
  // YOUR CODE HERE
  var list = $(`<div class="list-container">
  <div class="list" data-list-id=${list.id} id=${list.id}>
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=${list.id}>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`);
  $('#boardAnchor .board').append(list);
}

function renderCard(card) {
  // YOUR CODE HERE
  var listid = "#" + card.idList;
  var card = $(`<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
  <div class="card-body">
    ${card.name}
  </div>
</div>`)
  $(listid).children(".list-cards").append(card);
}
