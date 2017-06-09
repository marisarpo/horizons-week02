// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax("https://api.Trello.com/1/boards/5939cba1dcf328e876dc3447" + '/lists/', {
    method: 'POST',
    data: {
      key: "3d0a3251cadb197433ee714f0f51b47c",
      token: "7b8ff0c41f6d24b1bf1a6fc2fcdbd2b36bcb89b616ac40b01dc719ee877b95fe",
      name: listName
       },
    success: function(data) {
      render();
    }

});
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax("https://api.trello.com/1"+'/lists/' + listId+ '/cards/', {
    method: 'POST',
    data: {
      key: "3d0a3251cadb197433ee714f0f51b47c",
      token: "7b8ff0c41f6d24b1bf1a6fc2fcdbd2b36bcb89b616ac40b01dc719ee877b95fe",
      name: name
       },
    success: function(data) {
      render();
    }

});
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax("https://api.trello.com/1"+'/cards/' + cardId, {
    method: 'PUT',
    data: {
      key: "3d0a3251cadb197433ee714f0f51b47c",
      token: "7b8ff0c41f6d24b1bf1a6fc2fcdbd2b36bcb89b616ac40b01dc719ee877b95fe",
      name: title,
      desc:desc },
    success: function(data) {
      render();
    }

});
}

function render() {
  // YOUR CODE HERE
  return $.ajax('https://api.Trello.com/1/boards/5939cba1dcf328e876dc3447', {
  data: {
    key: "3d0a3251cadb197433ee714f0f51b47c",
    token: "7b8ff0c41f6d24b1bf1a6fc2fcdbd2b36bcb89b616ac40b01dc719ee877b95fe",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    return renderBoard(data) }
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  for(var i=0;i<board.lists.length;i++){
    renderList(board.lists[i]);
  }
  for(var i=0;i<board.cards.length;i++){
    renderCard(board.cards[i]);
  }

}

function renderList(list) {
  // YOUR CODE HERE
  var listcode =`<div class="list-container">
  <div class="list" data-list-id=${list.id} id=${list.id}>
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=${list.id}>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardFormLISTIDHERE">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`;
$('#'+ list.idBoard).append(listcode);
}

function renderCard(card) {
  // YOUR CODE HERE
  var cardcode = `<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
  <div class="card-body">
    ${card.name}
  </div>
</div>`;

  $('#'+card.idList).children('.list-cards').append(cardcode);
}
