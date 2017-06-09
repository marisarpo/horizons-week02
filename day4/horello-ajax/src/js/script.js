// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();

  // BONUS
  console.log("hello")
  $.ajaxSetup({
    data: {
      key: apiKey,
      token: apiToken
    }
  });

});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/lists', {
    method: "POST",
    data: {
      idBoard: boardId,
      key: apiKey,
      token: apiToken,
      name: listName
    },
    success: function(data){ render(); },
    error: function(err){ console.log(err); }
  });
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards', {
    method: "POST",
    data: {
      name: name,
      idList: listId,
      key: apiKey,
      token: apiToken
    },
    success: function(data){ render(); },
    error: function(err){ console.log(err); }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/'+cardId, {
    method: "PUT",
    data: {
      name: title,
      desc: desc,
      key: apiKey,
      token: apiToken
    },
    success: function(data){ render(); },
    error: function(err){ console.log("Error", err); }
  });

}

function render() {
  $.ajax('https://api.Trello.com/1/boards/'+ boardId, {
    data: {
      key: apiKey,
      token: apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) { renderBoard(data) }
  });
}

function renderBoard(board) {
  var boardAnchor = $("#boardAnchor");

  // clear board
  boardAnchor.empty();

  // make board div

  var newDiv = $("<div>");
  newDiv.attr("id",boardId);
  newDiv.addClass("board");

  // append board div
  boardAnchor.append(newDiv);

  board.lists.forEach(function(list){
    renderList(list);
  });
  board.cards.forEach(function(card){
    renderCard(card);
  });

}

function renderList(list) {
  // YOUR CODE HERE
  var text = `<div class="list-container">
  <div class="list" data-list-id=`+list.id+` id=`+list.id+`>
  <div class="list-header">
  <span class="list-title">`+ list.name +`</span>
  </div>
  <div class="list-cards"></div>
  <div class="list-footer">
  <button class="add-card" addcardid=`+list.id+`>Add a card...</button>
  <div class="collapse add-card-form-wrapper" id="addCardForm"`+list.id+`>
  <div class="well add-card-form">
  <input type="text" class="form-control" placeholder="Card title" id="addCardTitle"`+list.id+`/>
  <button type="button" class="btn btn-default add-card-save" id="addCardBtn"`+list.id+`>Save</button>
  <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn"`+list.id+`></span></button>
  </div>
  </div>
  </div>
  </div>
  </div>`;
  var newList = $(text);
  $("#" + boardId).append(newList);
}

function renderCard(card) {
  var text = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`;

  var newCard = $(text);

  $("#"+card.idList+" .list-cards").append(newCard);
}
