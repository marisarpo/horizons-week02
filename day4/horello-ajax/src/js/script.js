// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.trello.com/1/lists', {
    method: 'POST',
    data: {
      key: "7dc51c297f47cc2897392c0c03482894",
      token: "82b39dac01bb8de86cd253b07badf001a9f77bc58f8bbd146b8affa5166084b2",
      name: listName,
      idBoard: "594c603f1342a9e248a46c8c",
      pos: 'bottom'
    },
    success: function(){
      render();
    }
  })

}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax('https://api.trello.com/1/cards', {
    method: 'POST',
    data: {
      key: "7dc51c297f47cc2897392c0c03482894",
      token: "82b39dac01bb8de86cd253b07badf001a9f77bc58f8bbd146b8affa5166084b2",
      name: name,
      idList: listId
    },
    success: function(){
      render()
    }
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax('https://api.trello.com/1/cards/' + cardId, {
    method: 'PUT',
    data: {
      key: "7dc51c297f47cc2897392c0c03482894",
      token: "82b39dac01bb8de86cd253b07badf001a9f77bc58f8bbd146b8affa5166084b2",
      id: cardId,
      name: title,
      desc: desc
    },
    success: function(){
      render();
  }
})
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/594c603f1342a9e248a46c8c', {

    data: {
      key: "7dc51c297f47cc2897392c0c03482894",
      token: "82b39dac01bb8de86cd253b07badf001a9f77bc58f8bbd146b8affa5166084b2",
      cards: 'all',
      lists: 'all'
  },

  success: function(data) {
    console.log(data);
    renderBoard(data);
  }
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  var listArray = board.lists;
  listArray.forEach(function(value, key){
    renderList(value);
  })

  var cardsArray = board.cards;
  cardsArray.forEach(function(value, key){
    renderCard(value);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var newList = `<div class="list-container">
  <div class="list" data-list-id="${list.id}" id="${list.id}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list.id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`

$('#boardAnchor .board').append(newList);
}

function renderCard(card) {
  // YOUR CODE HERE
  var newCard = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`

$('#' + card.idList + ' .list-cards').append(newCard);

}
