// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url:'https://api.trello.com/1/lists',
    type:'POST',
    data:{
      key: "ec80a4e46ac640139e5e17c5f43366e1",
      token: "f4243bcc0f15cf844877688b508d37057f091f1904f684c0a0e1ed4249f8b7e0",
      name:listName,
      idBoard:"592d061d3b99e2964250aa11",
    },
    success:function(){
      render();
    }
  })
  }

function createCard(name, listId) {
   $.ajax({
     url:'https://api.trello.com/1/cards',
     type:'POST',
     data:{
       key: "ec80a4e46ac640139e5e17c5f43366e1",
       token: "f4243bcc0f15cf844877688b508d37057f091f1904f684c0a0e1ed4249f8b7e0",
       idList:listId,
       },
     success:function(){
       render();
     }
   })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url:'https://api.trello.com/1/cards/'+cardId,
    type:'PUT',
    data:{
      key: "ec80a4e46ac640139e5e17c5f43366e1",
      token: "f4243bcc0f15cf844877688b508d37057f091f1904f684c0a0e1ed4249f8b7e0",
      name: title,
      desc: desc
    },
    success:function(){
      render();
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/592d061d3b99e2964250aa11', {
  data: {
    key: "ec80a4e46ac640139e5e17c5f43366e1",
    token: "f4243bcc0f15cf844877688b508d37057f091f1904f684c0a0e1ed4249f8b7e0",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data) }
});

}

function renderBoard(board) {
  console.log(board);

  $('#boardAnchor').empty();
  var div=  `<div id="${boardId}" class="board"></div>`;
  $('#boardAnchor').append(div);
  for (var i = 0; i < board.lists.length; i++) {
    renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++) {
    renderCard(board.cards[i]);
  }
}

function renderList(list) {
  var str =
  `<div class="list-container">
  <div class="list" data-list-id="${list.id}" id="${list.id}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list.id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm ${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle ${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn ${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn ${list.id}></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`
$('#boardAnchor').find(".board").append(str);
}

function renderCard(card) {
  var str=
  `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`

// console.log(card);
  $('#'+card.idList).find('.list-cards').append(str);
}
