// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function () {
  setEventListeners();
  render();
});

setInterval(render, 30000);

$.ajaxSetup({
  data: {
    key: "43f0075fe9030b2389fe1fd4f4109899",
    token: "c171cfec1c6c80343fc87f21e678dd9e60a8aae7c0835a785343a0382fe90f7d"
  }
});

function createList(listName) {
  // YOUR CODE HERE

  $.ajax({
    method: 'POST',
    url: `https://api.Trello.com/1/lists/`,
    data: {
      // key: "43f0075fe9030b2389fe1fd4f4109899",
      // token: "c171cfec1c6c80343fc87f21e678dd9e60a8aae7c0835a785343a0382fe90f7d",
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function (resp) {
      render();
    },
    error: function (err) {
      alert("err");
    }
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    method: 'POST',
    url: `https://api.Trello.com/1/cards/`,
    data: {
      // key: apiKey,
      // token: apiToken,
      name: name,
      idList: listId
    },
    success: function (resp) {
      render();
    },
    error: function (err) {
      alert("err");
    }
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    method: 'PUT',
    url: `https://api.Trello.com/1/cards/${cardId}`,
    data: {
      // key: "43f0075fe9030b2389fe1fd4f4109899",
      // token: "c171cfec1c6c80343fc87f21e678dd9e60a8aae7c0835a785343a0382fe90f7d",
      desc: desc,
      name: title
    },
    success: function (resp) {
      render();
    },
    error: function (err) {
      alert("err");
    }
  });
}

function render() {

  $.ajax('https://api.Trello.com/1/boards/5939c424749ac28bde91c0ca', {
    data: {
      // key: "43f0075fe9030b2389fe1fd4f4109899",
      // token: "c171cfec1c6c80343fc87f21e678dd9e60a8aae7c0835a785343a0382fe90f7d",
      cards: 'all',
      lists: 'all'
    },
    success: function (data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $("#boardAnchor").empty();
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function (tmpList) {
    renderList(tmpList);
  });

  board.cards.forEach(function (tmpCard) {
    renderCard(tmpCard);
  });

}

function renderList(list) {
  // YOUR CODE HERE
  console.log("list ", list);

  var listStr = `<div class="list-container">
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
  $(`#${boardId}`).append(listStr);
}

function renderCard(card) {
  // YOUR CODE HERE
  //console.log("card ", card);
  var cardList = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.name}" data-card-id="${card.id}">
    <div class="card-body">
      ${card.name}
    </div>
  </div>`;
  $(`#${card.idList} .list-cards`).append(cardList);
}
