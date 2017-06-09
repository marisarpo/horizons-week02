// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  $.ajaxSetup({
    data: {
      key: "8f9c14b5b955f7f5a883f9f43b3ae569",
      token: "b43b2eecd330e6e24fda61f33a6ef06c28d14deecf68e73f6b2e91e90204d6fa",
      idBoard: "5939bfa89fd37e86fc349bb9"
    }
  })
  setEventListeners();
  render();
  setInterval(render, 30000);
});

function createList(listName) {
  $.ajax({
    url: "https://api.Trello.com/1/lists/",
    type: 'POST',
    data: {
      name: listName
    },
    success: function(data) {
      render();
    },
    error: function(error) {
      console.log("unsuccessful update ... lists stayed the same");
    }
  });
}

function createCard(name, listId) {
  $.ajax({
    url: "https://api.Trello.com/1/cards/",
    type: 'POST',
    data: {
      name: name,
      idList: listId
    },
    success: function(data) {
      render();
    },
    error: function(error) {
      console.log("unsuccessful update ... cards stayed the same");
    }
  });
}

function deleteCard(cardId) {
  $.ajax({
    url: "https://api.Trello.com/1/cards/" + cardId,
    type: 'DELETE',
    success: function(data) {
      render();
    },
    error: function(error) {
      console.log("unsuccessful update ... card not deleted");
    }
  });
}


function updateCard(title, desc, cardId) {
  $.ajax({
    url: "https://api.Trello.com/1/cards/" + cardId,
    type: 'PUT',
    data: {
      name: title,
      desc: desc
    },
    success: function(data) {
      render();
    },
    error: function(error) {
      console.log("unsuccessful update ... cards stayed the same");
    }
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939bfa89fd37e86fc349bb9', {
  data: {
    cards: 'all',
    lists: 'all'
  },
    success: function(data) {
      renderBoard(data);
    },
    error: function(error) {
      console.log("cards failed to be accessed");
    }
  });
}

function renderBoard(board) {
  $("#boardAnchor").empty();
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(list) {
    renderList(list);
  });
  board.cards.forEach(function(card) {
    renderCard(card);
  });
}

function renderList(list) {
  var listWrapper = $(`
  <div class="list-container">
    <div class="list" data-list-id="`+ list.id + `" id="` + list.id + `">
      <div class="list-header">
        <span class="list-title">` + list.name + `</span>
      </div>
      <div class="list-cards"></div>
      <div class="list-footer">
        <button class="add-card" addcardid="`+ list.id + `">Add a card...</button>
        <div class="collapse add-card-form-wrapper" id="addCardForm` + list.id + `">
          <div class="well add-card-form">
            <input type="text" class="form-control" placeholder="Card title" id="addCardTitle` + list.id + `" />
            <button type="button" class="btn btn-default add-card-save" id="addCardBtn` + list.id + `">Save</button>
            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn` + list.id + `"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>`);
  $("#boardAnchor .board").append(listWrapper);
}

function renderCard(card) {
  var listWrapper = $(`
    <div id= "` + card.id + `" class="card" data-card-desc="` + card.desc + `" data-card-name="` + card.name + `" data-list-id="` + card.idList + `" data-card-id="` + card.id + `">
      <div class="card-body">
        ` + card.name + `
        <button class = "deleteButton"> X </button>
      </div>
    </div>`);
  $("#" + card.idList + " .list-cards").append(listWrapper);
}
