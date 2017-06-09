// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

$.ajaxSetup({
  data: {
    key: "9754830485cc4e0ce17b827b98c12072",
    token: "fded44758c4fb0b523edc02b9b1b176cccdb0bd43261c6221cce0ec837cd7796",
    idBoard: "5939c66211778d9afb75e108"
  }
})

function createList(listName) {
  $.ajax('https://api.Trello.com/1/lists/', {
    method: 'post',
    data: {
      name: listName,
    },
    success: function (data) {
      render();
    }
  })
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards/', {
    method: 'post',
    data: {
      name: name,
      idList: listId
    },
    success: function (data) {
      render();
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId + '', {
    method: 'put',
    data: {
      name: title,
      desc: desc
    },
    success: function (data) {
      render();
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939c66211778d9afb75e108', {
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
  var boardId = board.id;
  $('#boardAnchor').empty();
  $('#boardAnchor').append($(`<div id="${boardId}" class="board"></div>`));

  board.lists.forEach(function(list) {
    renderList(list);
  })

  board.cards.forEach(function(card) {
    renderCard(card);
  })

}

function renderList(list) {
  console.log("yeah")
  $('#boardAnchor .board').append($(`<div class="list-container"> <div class="list" data-list-id="${list.id}" id="${list.id}"> <div class="list-header"> <span class="list-title">${list.name}</span> </div> <div class="list-cards"></div> <div class="list-footer"> <button class="add-card" addcardid="${list.id}">Add a card...</button> <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}"> <div class="well add-card-form"> <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" /> <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button> <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button> </div> </div> </div> </div> </div>`))

}

function renderCard(card) {
  var listID = card.idList;
  var listIDf = '#' +  card.idList;
  $(`${listIDf}`).children('.list-cards').append($(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${listID}" data-card-id="${card.id}"> <div class="card-body"> ${card.name} </div> </div>`))
}

function pollServer() {

  setInterval(function(){
    render();


    }, 30000);

}

pollServer();
