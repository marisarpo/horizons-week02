// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();

  setInterval(render, 30000);
});

$.ajaxSetup({
  data: {
    key: apiKey,
    token: apiToken
  }
});

function createList(listName) {
  $.ajax(apiUrl + '/lists', {
    method: 'POST',
    data: {
      name: listName,
      idBoard: boardId,
      pos: "bottom"
    },
    success: function(data) {
      render();
    }
  });
}

function createCard(name, listId) {
  $.ajax(apiUrl + '/cards', {
    method: 'POST',
    data: {
      name: name,
      idList: listId
    },
    success: function(data) {
      render();
    }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax(apiUrl + '/cards/' + cardId, {
    method: 'PUT',
    data: {
      name: title,
      desc: desc
    },
    success: function(data) {
      render();
    }
  });
}

function render() {
  $.ajax(apiUrl + '/boards/' + boardId, {
    data: {
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
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(listObj) {
    renderList(listObj);
  });
  board.cards.forEach(function(cardObj) {
    renderCard(cardObj);
  });
}

function renderList(list) {
  var htmlList = `<div class="list-container">
                    <div class="list" data-list-id=${list.id} id=${list.id}>
                      <div class="list-header">
                        <span class="list-title">${list.name}</span>
                      </div>
                      <div class="list-cards"></div>
                      <div class="list-footer">
                        <button class="add-card" addcardid=${list.id}>Add a card...</button>
                        <div class="collapse add-card-form-wrapper" id=${"addCardForm"+list.id}>
                          <div class="well add-card-form">
                            <input type="text" class="form-control" placeholder="Card title" id=${"addCardTitle"+list.id} />
                            <button type="button" class="btn btn-default add-card-save" id=${"addCardBtn"+list.id}>Save</button>
                            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id=${"addCardCancelBtn"+list.id}></span></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
  $("#boardAnchor").find('.board').append(htmlList);
}

function renderCard(card) {
  var htmlCard = `<div id=${card.id} class="card" data-card-desc=${card.desc}
                  data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
                    <div class="card-body">
                      ${card.name}
                    </div>
                  </div>`
  var id = "#" + card.idList;
  $(id).find('.list-cards').append(htmlCard);
}
