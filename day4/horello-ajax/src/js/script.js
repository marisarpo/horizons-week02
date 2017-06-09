// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url:"https://api.Trello.com/1/lists",
    success:render,
    method:'post',
    data: {
      key: "7715950c1919ff294b6a92eaf02f719d",
      token: "cae8c9aa7e62cb0efd686d9f2c9a67fe3b793d450b8e89078c85961f5a558fde",
      name: listName,
      idBoard: boardId,
      pos:'bottom',
    }

  })
}

function createCard(name, listId) {
  $.ajax({
    url:"https://api.Trello.com/1/cards/",
    success:render,
    method:'post',
    data: {
      key: "7715950c1919ff294b6a92eaf02f719d",
      token: "cae8c9aa7e62cb0efd686d9f2c9a67fe3b793d450b8e89078c85961f5a558fde",
      name: name,
      idList: listId,
    }

  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url:"https://api.Trello.com/1/cards/"+cardId,
    success:render,
    method:'put',
    data: {
      key: "7715950c1919ff294b6a92eaf02f719d",
      token: "cae8c9aa7e62cb0efd686d9f2c9a67fe3b793d450b8e89078c85961f5a558fde",
      name: title,
      desc: desc
    }

  })
}
var board;
function render() {
  $.ajax('https://api.Trello.com/1/boards/5939d7bde73c3fe78d46bb28', {
  data: {
    key: "7715950c1919ff294b6a92eaf02f719d",
    token: "cae8c9aa7e62cb0efd686d9f2c9a67fe3b793d450b8e89078c85961f5a558fde",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    //console.log(data);
    renderBoard(data);
  }
});
}

function renderBoard(board) {
  $('#boardAnchor').empty();

  var divi= $(`<div id="${board.id}" class="board"></div>`)
  $('#boardAnchor').append(divi);

  var list=board.lists;
  var card=board.cards;
  list.forEach(function(ind){
    renderList(ind);
  });

  card.forEach(function(ind){

    renderCard(ind);
  });
}

function renderList(list) {
  var listId=list.id;



  var listObject=$(`<div class="list-container">
  <div class="list" data-list-id="${listId}" id="${listId}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${listId}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${listId}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${listId}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${listId}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtnLISTIDHERE"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`)

$('#boardAnchor .board').append(listObject);
}

function renderCard(card) {


  var cardObject=$(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`)

$("#"+card.idList).find('.list-cards').append(cardObject);
}
