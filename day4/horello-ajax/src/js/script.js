// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/boards/5b19b0a9ed422c1eb98bcca8' + '/lists', {
    method: 'POST',
    data: {
      key: 'd6062e31b3142ca01f5134f8582feca5',
      token: '1ace835899451cfc12e16284edb3d7ed356eb7993576796b203fa72607e75284',
      name: listName,
    },
    success: function(data) {
      render();
    }
  })
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards', {
    method: 'POST',
    data: {
      key: 'd6062e31b3142ca01f5134f8582feca5',
      token: '1ace835899451cfc12e16284edb3d7ed356eb7993576796b203fa72607e75284',
      name: name,
      idList: listId
    },
    success: function(data) {
      console.log(data);
      render();
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: 'PUT',
    data: {
      key: 'd6062e31b3142ca01f5134f8582feca5',
      token: '1ace835899451cfc12e16284edb3d7ed356eb7993576796b203fa72607e75284',
      name: title,
      desc: desc
    },
    success: function(data) {
      render();
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5b19b0a9ed422c1eb98bcca8', {
  data: {
    key: 'd6062e31b3142ca01f5134f8582feca5',
    token: '1ace835899451cfc12e16284edb3d7ed356eb7993576796b203fa72607e75284',
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data);
  },
});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id = "${boardId}" class = "board"></div>');
  for (var i = 0; i < board.lists.length; i++) {
    renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++) {
    renderCard(board.cards[i]);
  }
}

function renderList(list) {
  var list_id = list.id;
  var html_string = `<div class="list-container">
  <div class="list" data-list-id= "`+ list_id +`" id="`+ list_id +`">
    <div class="list-header">
      <span class="list-title">`+list.name+`</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="`+ list_id +`">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm`+ list_id +`">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle` + list_id + `" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn` + list_id +`">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+ list_id +`"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`
$('.board .board').append(html_string)
}

function renderCard(card) {
  var card_name = `<div id="`+ card.id +`" class="card" data-card-desc="`+ card.desc +`" data-card-name="`+ card.name +`" data-list-id="`+ card.idList +`" data-card-id="`+card.id+`">
  <div class="card-body">
    `+card.name+`
  </div>
</div>`
  $('#' + card.idList).find('.list-cards').append(card_name);
}
