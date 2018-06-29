// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/lists/', {
    method: 'POST',
    data: {
    key: "8c608094355b7c90d1b096a9f51fecb6",
    token: "46275115f4aa4a1b85dce416dabe5cedea6afd59a69f1f5627470305c1244d86",
    name: listName,
    idBoard: "5b352f34030522982ab7e805",
    pos: "bottom"
  },
  success: function() {
    render();
  }
});
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards/', {
    method: 'POST',
    data: {
    key: "8c608094355b7c90d1b096a9f51fecb6",
    token: "46275115f4aa4a1b85dce416dabe5cedea6afd59a69f1f5627470305c1244d86",
    name: name,
    idList: listId,
    pos: "bottom"
  },
  success: function() {
    render();
  }
});
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: 'PUT',
    data: {
    key: "8c608094355b7c90d1b096a9f51fecb6",
    token: "46275115f4aa4a1b85dce416dabe5cedea6afd59a69f1f5627470305c1244d86",
    name: title,
    desc: desc
  },
  success: function() {
    render();
  }
});
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5b352f34030522982ab7e805', {
    method: 'GET',
    data: {
    key: "8c608094355b7c90d1b096a9f51fecb6",
    token: "46275115f4aa4a1b85dce416dabe5cedea6afd59a69f1f5627470305c1244d86",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data);
  }
});

}

function renderBoard(board) {
  $("#boardAnchor").empty();
  $("#boardAnchor").append(`<div id="${board.id}" class="board"></div>`);
  board.lists.forEach(function(item) {
    if (!item.closed) {
      renderList(item);
    }
  });
  board.cards.forEach(function(item) {
    if (!item.closed) {
      renderCard(item);
    }
  });
}

function renderList(list) {
  console.log("Rendering");
  $("#" + list.idBoard).append(`<div class="list-container">
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
</div>`);
}

function renderCard(card) {
  var str = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <button type="button" class="btn btn-light float-right" style="
    float: right;
">X</button>
  <div class="card-body">
    ${card.name}
  </div>
</div>`;
  $("#" + card.idList).find(".list-cards").append(str);
}
