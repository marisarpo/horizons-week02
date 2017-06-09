// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.


$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax(apiUrl + "/lists", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function (list) {
      console.log("Successfully created list with ID " + list.id + " for board " + boardId);
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error creating list for board " + boardId + ": " + JSON.stringify(err));
    }.bind(this)
  });
}

function createCard(name, listId) {
  $.ajax(apiUrl + "/cards", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId
    },
    success: function (data) {
      console.log("Successfully created new card: " + JSON.stringify(data));
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error creating new card: " + JSON.stringify(err));
    }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' +cardId,{
    method: "PUT",
    data:{
      key: "37a1437be9312b34c40ae4a4da53e8d5",
      token: "6efc49199991467e9d4259d5720d62be6f8dcff44fcb140b0f37c838be8f9887",
      name: title,
      desc: desc
    },
    success: function(){
      render();
    },
    error: function(err){
      alert('e')
    }
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939db92a3bd71beadb352ee', {
  data: {
    key: "37a1437be9312b34c40ae4a4da53e8d5",
    token: "6efc49199991467e9d4259d5720d62be6f8dcff44fcb140b0f37c838be8f9887",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data);
  },
  error: function(err){
    console.log(err);
  }
});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append($(`<div id="${boardId}" class="board"></div>`))
  board.lists.forEach(function(i){
    renderList(i);
  })
  board.cards.forEach(function(j){
    renderCard(j);
  });
}

function renderList(list) {
  var title = list.name;
  var id = list.id;
  var newList = `<div class="list-container">
  <div class="list" data-list-id="${id}" id="${id}">
    <div class="list-header">
      <span class="list-title">${title}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`;

$(`#${boardId}`).append(newList);
}


function renderCard(card) {

  var id = card.id;
  var name = card.name;
  var desc = card.desc;
  var list = card.idList;
  var newCard = `<div id="${id}" class="card" data-card-desc="${desc}" data-card-name="${name}" data-list-id="${list}" data-card-id="${id}">
  <div class="card-body">
    ${name}
  </div>
</div>`;

  $(`#${list} .list-cards`).append(newCard);
}
