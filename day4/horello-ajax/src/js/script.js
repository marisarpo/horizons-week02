// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/lists`, {
    data: {
      key: 'e7d93f34441e3831883e946237dcfdc0',
      token: 'b9a3642b8588bbc023a23de228648637f8bf8b21ac5b7772cb81921993f27a35',
      name: listName,
      idBoard: "593a0a1071aad0939640c215"
    },
    type: 'POST',
    success: function() {
      render();
    }

  })

}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards`, {
    data: {
      key: 'e7d93f34441e3831883e946237dcfdc0',
      token: 'b9a3642b8588bbc023a23de228648637f8bf8b21ac5b7772cb81921993f27a35',
      name: name,
      idList: listId
    },
    type: 'POST',
    success: function() {
      render();
    }

  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
    data: {
      key: 'e7d93f34441e3831883e946237dcfdc0',
      token: 'b9a3642b8588bbc023a23de228648637f8bf8b21ac5b7772cb81921993f27a35',
      name: title,
      desc: desc
    },
    type: 'PUT',
    success: function() {
      render();
    }

  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/593a0a1071aad0939640c215', {
    data: {
      key: 'e7d93f34441e3831883e946237dcfdc0',
      token: 'b9a3642b8588bbc023a23de228648637f8bf8b21ac5b7772cb81921993f27a35',
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
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board">`);

  for(var i = 0; i < board.lists.length; i++){
    //console.log('hi');
    renderList(board.lists[i]);
  }
//console.log(board.cards);
  for(var j = 0; j < board.cards.length; j++){
    //console.log('bye');

    renderCard(board.cards[j]);
  }

}

function renderList(list) {
  // YOUR CODE HERE
  $('#boardAnchor .board').append(`<div class="list-container">
  <div class="list" data-list-id="${list["id"]}" id="${list["id"]}">
    <div class="list-header">
      <span class="list-title">${list['name']}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list["id"]}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list["id"]}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list["id"]}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list["id"]}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list["id"]}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>
`)
}

function renderCard(card) {
  // YOUR CODE HERE
  //replace card id and card description and such...
  var toAppend = `<div id="${card['id']}" class="card" data-card-desc="${card['desc']}"
  data-card-name="${card['name']}" data-list-id="${card['idList']}" data-card-id="${card['id']}">
  <div class="card-body">
    ${card['name']}
  </div>
</div>`;

  var listid = card['idList'];

  //var print = $('#'+ listid + ' list-cards').append(toAppend);
  //console.log(print);

  $('#'+ listid).find('.list-cards').append(toAppend);

}
