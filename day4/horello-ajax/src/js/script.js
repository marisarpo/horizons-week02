// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
var boardId = "5939c7fa9cc595c2a7cb42e2"
$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/boards/5939c7fa9cc595c2a7cb42e2' +
    "/lists", {
    method: "POST",
    data: {
      key: "e95d7557c9376f072a09f5b3898d550f",
      token: "658465b21d26fbd203792a489cec3794206421b7ad85b8d7366f51f75dd58246",
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function(list) {
      console.log("Successfully created list with ID " + list.id + " for board " + boardId);
      render();
    }.bind(this),
    error: function(err) {
      console.error("Error creating list for board " + boardId + ": " + JSON.stringify(err));
    }.bind(this)
  });
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/boards/5939c7fa9cc595c2a7cb42e2' +
    "/cards", {
    method: "POST",
    data: {
      key: "e95d7557c9376f072a09f5b3898d550f",
      token: "658465b21d26fbd203792a489cec3794206421b7ad85b8d7366f51f75dd58246",
      name: name,
      idList: listId
    },
    success: function(data) {
      console.log("Successfully created new card: " + JSON.stringify(data));
      render();
    }.bind(this),
    error: function(err) {
      console.error("Error creating new card: " + JSON.stringify(err));
    }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/boards/5939c7fa9cc595c2a7cb42e2' +
    "/cards", {
    method: "POST",
    data: {
      key: "e95d7557c9376f072a09f5b3898d550f",
      token: "658465b21d26fbd203792a489cec3794206421b7ad85b8d7366f51f75dd58246",
      name: title,
      idList: listId
    },
    success: function(data) {
      console.log("Successfully created new card: " + JSON.stringify(data));
      render();
    }.bind(this),
    error: function(err) {
      console.error("Error creating new card: " + JSON.stringify(err));
    }
  });

}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939c7fa9cc595c2a7cb42e2', {
    data: {
      key: "e95d7557c9376f072a09f5b3898d550f",
      token: "658465b21d26fbd203792a489cec3794206421b7ad85b8d7366f51f75dd58246",
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
  $("#boardAnchor").append(`<div id=${board.id} class="board"></div>`);
  board.lists.reverse().forEach(function(list) {
    renderList(list)
  });
  board.cards.forEach(function(card) {
    renderCard(card)
  });

}

function renderList(list) {
  var listMold = (`<div class="list-container">
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
</div>`)
  $("#boardAnchor").after(listMold);

}

function renderCard(card) {
  var cardMold = (`<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
                  <div class="card-body">
                    ${card.name}
                  </div>
                </div>`);
  $(`#${card.idList}`).find('.list-cards').after(cardMold);
}
