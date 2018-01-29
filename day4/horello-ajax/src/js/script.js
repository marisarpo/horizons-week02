// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax(`https://api.trello.com/1/lists`, {
    data: {
      key: "0e4827a24c2094e82705e8cf30d693ed",
      token: "dc35bc81eeec15e64146299f872e9dded9d6819354add078d78539b87230d6f4",
      name: listName,
      idBoard: boardId
    },
    method: "POST",
    success: function(data) {
      render(data);
    }
    });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(`https://api.trello.com/1/cards`, {
    data: {
      key: "0e4827a24c2094e82705e8cf30d693ed",
      token: "dc35bc81eeec15e64146299f872e9dded9d6819354add078d78539b87230d6f4",
      name: name,
      idList: listId
    },
    method: "POST",
    success: function(data) {
      render(data);
    }
    });
}

function updateCard(title, desc, cardId) {
  $.ajax(`https://api.trello.com/1/cards/${cardId}`, {
  data: {
    key: "0e4827a24c2094e82705e8cf30d693ed",
    token: "dc35bc81eeec15e64146299f872e9dded9d6819354add078d78539b87230d6f4",
    name: title,
    desc: desc
  },
  method: "PUT",
  success: function(data) {
    render(data);
  }
  });
}

function render() {
  // YOUR CODE HERE



  $.ajax('https://api.Trello.com/1/boards/5a6a6543f1dc64314d890ff1', {
  data: {
    key: "0e4827a24c2094e82705e8cf30d693ed",
    token: "dc35bc81eeec15e64146299f872e9dded9d6819354add078d78539b87230d6f4",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data) }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $(".list-container").empty();
  // $("#boardAnchor").prev().empty();
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);

  $.each(board.lists, function(i, list){
    // console.log("list", i, list);
    renderList(list);
  });
  $.each(board.cards, function(i, card){
    // console.log("card", i, card);
    renderCard(card);
  });
}

function renderList(list) {
  // YOUR CODE HERE
  var rendered = `<div class="list-container">
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
  </div>`;
  // console.log(rendered);
  $("#boardAnchor").before(rendered);
}

function renderCard(card) {
  // YOUR CODE HERE
  var rendered = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
    <div class="card-body">
      ${card.name}
    </div>
  </div>`;
  // console.log(rendered);
  
  // console.log("card, listid", card.idList);
  $("#" + card.idList).find(".list-cards").append(rendered);
  // $(".board").append(rendered);
}
