// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
var zeObject = null
$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/' + "lists", {
    type: 'POST',
    data: {
      key: "1d5de5183e42c07fc7c72cef9788988f",
      token: "9db612f995bf9c7d35a05dcb87d1f8f284861505746dc9b44733de4a87faa951",
      name: listName,
      idBoard: "59bb19cac6b00998f20b5e59",
      position: 'bottom',
    },
    success: function (data) {
      console.log("Successfully created list");
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error created list");
    }.bind(this)
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/' + "cards", {
    method: "POST",
    data: {
      key: "1d5de5183e42c07fc7c72cef9788988f",
      token: "9db612f995bf9c7d35a05dcb87d1f8f284861505746dc9b44733de4a87faa951",
      name: name,
      idList: listId,
    },
    success: function (data) {
      console.log("Successfully created list");
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error created list");
    }.bind(this)
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/' + "/cards/" + cardId, {
    type: 'PUT',
    data: {
      key: "1d5de5183e42c07fc7c72cef9788988f",
      token: "9db612f995bf9c7d35a05dcb87d1f8f284861505746dc9b44733de4a87faa951",
      name: title,
      desc: desc,
    },
    success: function (data) {
      console.log("Successfully updated card ");
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error updating title of card ");
    }.bind(this)
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/59bb19cac6b00998f20b5e59', {
  data: {
    key: "1d5de5183e42c07fc7c72cef9788988f",
    token: "9db612f995bf9c7d35a05dcb87d1f8f284861505746dc9b44733de4a87faa951",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data) }
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty()
  $('#boardAnchor').append(`<div id="${board.id}" class="board"></div>`)

  board.lists.forEach(function(list) {renderList(list)});
  board.cards.forEach(function(card) {renderCard(card)});

  // console.log(board)
}



function renderList(list) {
  // YOUR CODE HERE
  // console.log(list)
  $(`#${list.idBoard}`).append(`
    <div class="list-container">
    <div class="list" data-list-id=${list.id} id=${list.id}>
      <div class="list-header">
        <span class="list-title">test123</span>
      </div>
      <div class="list-cards"></div>
      <div class="list-footer">
        <button class="add-card" addcardid=${list.id}>Add a card...</button>
        <div class="collapse add-card-form-wrapper" id=${list.id}>
          <div class="well add-card-form">
            <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
            <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancel${list.id}"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
`)
}

function renderCard(card) {
  // YOUR CODE HERE
  // console.log(card)
  $(`#${card.idList}`).find('.list-cards').append(`
  <div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
  <div class="card-body">
    ${card.name}
  </div>
</div>
`)
}
