// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render($.ajax('https://api.Trello.com/1/boards/5939c8404e32721f00f0f80b', {
    data: {
      key: "88a6ced894ec2951795d890bfa709660",
      token: "adbcaeda9030b5215af9e450b5b9fa0cd1bd5238e0c000141d19905ed4af6f35",
      cards: 'all',
      lists: 'all'
    },
    // success: function(data) {
    //   renderBoard(data);
    // }
  }));
});

function createList(listName) {
  $.ajax({
    url: `https://api.Trello.com/1/lists`,
    method: 'POST',
    data: {
      key: "88a6ced894ec2951795d890bfa709660",
      token: "adbcaeda9030b5215af9e450b5b9fa0cd1bd5238e0c000141d19905ed4af6f35",
      name: listName,
      idBoard: "5939c8404e32721f00f0f80b"
      //  cards:'all',
      //  lists:'all'
    },
    success: function(data) {

      render();
    },
    error: function(err) {
      console.log(err);
    }
  })
  // YOUR CODE HERE
}

function createCard(name, listId) {
  $.ajax({
    url: `https://api.Trello.com/1/cards`,
    method: 'POST',
    data: {
      key: "88a6ced894ec2951795d890bfa709660",
      token: "adbcaeda9030b5215af9e450b5b9fa0cd1bd5238e0c000141d19905ed4af6f35",
      name: name,
      idList: listId,
      idBoard: "5939c8404e32721f00f0f80b"
      //  cards:'all',
      //  lists:'all'
    },
    success: function(data) {

      render();
    },
    error: function(err) {
      console.log(err);
    }
  })
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url: `https://api.Trello.com/1/cards/${cardId}`,
    method: 'PUT',
    data: {
      key: "88a6ced894ec2951795d890bfa709660",
      token: "adbcaeda9030b5215af9e450b5b9fa0cd1bd5238e0c000141d19905ed4af6f35",
      id: cardId,
      name: title,
      desc: desc,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      render();
    }
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax({
    url: 'https://api.Trello.com/1/boards/5939c8404e32721f00f0f80b',
    //method:
    data: {
      key: "88a6ced894ec2951795d890bfa709660",
      token: "adbcaeda9030b5215af9e450b5b9fa0cd1bd5238e0c000141d19905ed4af6f35",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  })
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(item) {
    renderList(item);
  })
  board.cards.forEach(function(item) {
    renderCard(item);
  })
  // YOUR CODE HERE
}

function renderList(list) {
  // YOUR CODE HERE
  var idString = list.id; //// notes changing ID
  var listBody = $(`<div class="list-container">
  <div class="list" data-list-id= ${idString} id=${idString}>
  <div class="list-header">
  <span class="list-title">"${list.name}"</span>
  </div>
  <div class="list-cards"></div>
  <div class="list-footer">
  <button class="add-card" addcardid="${idString}">Add a card...</button>
  <div class="collapse add-card-form-wrapper" id="addCardForm" + ${idString}>
  <div class="well add-card-form">
  <input type="text" class="form-control" placeholder="Card title" id="addCardTitle" + ${idString} />
  <button type="button" class="btn btn-default add-card-save" id="addCardBtn"+${idString}>Save</button>
  <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtnLISTIDHERE"></span></button>
  </div>
  </div>
  </div>
  </div>
  </div>`);
  $(`#${boardId}`).append(listBody);
}

function renderCard(card) {
  // YOUR CODE HERE
  var cardId = card.id;
  var cardDesc = card.desc;
  var cardName = card.name;
  var listId = card.idList;
  var listCard = $(`<div id=${cardId} class="card" data-card-desc="${cardDesc}" data-card-name="${cardName}" data-list-id=${listId} data-card-id=${cardId}>
 <div class="card-body">
       "${cardName}"
 </div>
</div>`)
  $('#' + listId + ' .list-cards').append(listCard);
}
