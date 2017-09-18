// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
  });

function createList(listName) {
  // YOUR CODE HERE
}

function createCard(name, listId) {
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(apiUrl + "/cards/" + cardId, {
    method: "PUT",
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function (data) {
      console.log("Successfully updated card " + cardId);
      console.log("apiKey" + apiKey);
      console.log("token" + apiToken);
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error updating title of card " + cardId + ": " + JSON.stringify(err));
    }.bind(this)
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/59bb1b1add482a363b013fa5', {
    data: {
      key: "d40b44cb322607cd62749dae42fd2bdb",
      token: "a9313434cb35cff4a600b5b781d9c514702ad80d517e4c1769c5631909526aa1",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {renderBoard(data)}
  });
  // YOUR CODE HERE
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty(),
  $('#boardAnchor').append('<div id="${boardId}" class="board"></div>')
  board.lists.forEach(function(list) {renderList(list)});
  board.cards.forEach(function(card) {renderCard(card)});
}

function renderList(list) {
  // YOUR CODE HERE
  var id = list.id
var listid1 = `<div class="list-container">
  <div class="list" data-list-id=`+ id + ` id=`+ id + `>
    <div class="list-header">
      <span class="list-title">test123</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=`+ id + `>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm`+ id + `">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+ id + `" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtnLISTIDHERE">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+ id + `"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`

$('.board').append(listid1)
}

function renderCard(card) {
  // YOUR CODE HERE

var card1=  `<div id="${card.id}"" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
  ${card.name}
  </div>
</div>`
console.log(card)
$(`#${card.idList}`).find(`.list-cards`).append(card1)
}
