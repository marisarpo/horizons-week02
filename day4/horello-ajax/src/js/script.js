// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: 'https://api.Trello.com/1/lists',
    method: "POST",
    data: {
      key: 'f66dab0d6c6df01b9ccbfea6d14d33f0',
      token: '5c09c8a610cf675f340f529e1f394a379b63ace36db0a95d4f8a9910ac2a3a9d',
      name: listName,
      idBoard: '5939cf13f6c8dfb049709a26'
    },
    success: render
  })
}

function createCard(name, listId) {
  $.ajax({
    url: 'https://api.Trello.com/1/cards',
    method: "POST",
    data: {
      key: 'f66dab0d6c6df01b9ccbfea6d14d33f0',
      token: '5c09c8a610cf675f340f529e1f394a379b63ace36db0a95d4f8a9910ac2a3a9d',
      name: name,
      idList: listId
    },
    success: render
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url: 'https://api.Trello.com/1/cards/' + cardId,
    method: "PUT",
    data: {
      key: 'f66dab0d6c6df01b9ccbfea6d14d33f0',
      token: '5c09c8a610cf675f340f529e1f394a379b63ace36db0a95d4f8a9910ac2a3a9d',
      name: title,
      desc: desc
    },
    success: render
  })

}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939cf13f6c8dfb049709a26', {
    data: {
      key: "f66dab0d6c6df01b9ccbfea6d14d33f0",
      token: "5c09c8a610cf675f340f529e1f394a379b63ace36db0a95d4f8a9910ac2a3a9d",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${board.id}" class="board"></div>`);
  _.forEach(board.lists, function(list) {
    renderList(list)
  });
  _.forEach(board.cards, function(card) {
    renderCard(card)
  });
}

function renderList(list) {
  var newList = `<div class="list-container">
  <div class="list" data-list-id="` + list["id"] + `" id="` + list["id"] + `">
    <div class="list-header">
      <span class="list-title">` + list['name'] + `</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="` + list["id"] + `">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm` + list["id"] + `">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle` + list["id"] + `" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn` + list["id"] + `">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn` + list["id"] + `"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`;
  $('#boardAnchor .board').append(newList);
}

function renderCard(card) {
  var newCard = `<div id="` + card["id"] + `" class="card" data-card-desc="` + card["desc"] + `" data-card-name="` + card["name"] + `" data-list-id="` + card["idList"] + `" data-card-id="` + card["id"] + `">
  <div class="card-body">` +
    card["name"] +
    `</div>
</div>`;

  $("#" + card["idList"]).find('.list-cards').after(newCard);
}
