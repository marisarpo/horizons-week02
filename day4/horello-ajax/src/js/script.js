// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5a6a65e0c04cc3c75c3d43fc/lists/', {
  method: "POST",
  data: {
    key: "21a66cc37e5a4bbfc7f7f4175a367d5c",
    token: "54f2e62f8102382529206c617e0ef061e56a2232b6500f3d5e395c4276fbb7bd",
    name: listName
    },
    success: function(data){render()}
});
}

function createCard(name, listId) {
  // YOUR CODE HERE
    $.ajax('https://api.Trello.com/1/lists/' + listId + '/cards/', {
    method: "POST",
    data: {
      key: "21a66cc37e5a4bbfc7f7f4175a367d5c",
      token: "54f2e62f8102382529206c617e0ef061e56a2232b6500f3d5e395c4276fbb7bd",
      name: name,
      idList: listId
      },
      success: function(data){render()}
  });
}

function updateCard(title, newDesc, cardId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
      method: "PUT",
    data: {
      key: "21a66cc37e5a4bbfc7f7f4175a367d5c",
      token: "54f2e62f8102382529206c617e0ef061e56a2232b6500f3d5e395c4276fbb7bd",
      name: title,
      desc: newDesc
    },
    success: function(data){render()}
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5a6a65e0c04cc3c75c3d43fc', {
  data: {
        key: "21a66cc37e5a4bbfc7f7f4175a367d5c",
        token: "54f2e62f8102382529206c617e0ef061e56a2232b6500f3d5e395c4276fbb7bd",
        cards: 'all',
        lists: 'all'
        },
      success: function(data) {renderBoard(data)}
    });
}

function renderBoard(board) {
  // YOUR CODE HERE
  // $('#boardAnchor').empty();
  // $('#boardAnchor').append('<div id="${boardId}" class="board"></div>');
  $('.toBeCleared').empty();
  for (var i = 0; i < board.lists.length; i++){
    renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++){
    renderCard(board.cards[i]);
  }
}

function renderList(list) {
  // YOUR CODE HERE
  var listid = list.id;
  var listname = list.name;
  var newHtml = `<div class="list-container toBeCleared">
  <div class="list" data-list-id="`+listid+`" id="`+listid+`">
    <div class="list-header">
      <span class="list-title">`+listname+`</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="`+listid+`">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm`+listid+`">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+listid+`" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn`+listid+`">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+listid+`"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`;
$('.add-list').closest('.list-container').before(newHtml);
}


function renderCard(card) {
  // YOUR CODE HERE
  var cardid = card.id;
  var carddesc = card.desc;
  var listid = card.idList;
  var cardname = card.name;
  var newHTML =
  `<div id="`+cardid+`" class="card" data-card-desc="`+carddesc+`" data-card-name="`+cardname+`" data-list-id="`+listid+`" data-card-id="`+cardid+`">
      <div class="card-body">
         `+cardname+`
      </div>
    </div>`;
$('#' +listid).children('.list-cards').append(newHTML);
}
