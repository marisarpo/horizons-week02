// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
setInterval(function () {
  setEventListeners();
  // render();
  $.ajaxSetup({
    url: apiUrl + '/boards/' + boardId,
    data: {
      key: apiKey,
      token: apiToken,
      idBoard: boardId
    },
    success: function(data) {
      console.log("reaches here again");
      render();
    }
  });
}, 3000)

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/lists/', {
    method: "POST",
    data:{
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function(data){
      render();
    }.bind(this),
  });

}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards/', {
    method: "POST",
    data:{
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId
    },
    success: function(data){
      render();
    }.bind(this),
  });


}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards/'+cardId, {
    method: "PUT",
    data:{
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function(data){
      render();
    }.bind(this)
  });

}

function render() {
  // YOUR CODE HERE
 $.ajax(apiUrl + '/boards/' + boardId, {
   method: 'GET',
   data: {
     key: apiKey,
     token: apiToken,
     cards: 'all',
     lists: 'all'
   },
   success: function(data) {
     renderBoard(data);
   }
 });

}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="${boardId}" class="board"></div>');
  for(var i=board.lists.length-1; i>=0; i--){
    renderList(board.lists[i]);
  }
  for(var i=0; i<board.cards.length; i++){
    renderCard(board.cards[i]);
  }

}

function renderList(list) {
  //YOUR CODE HERE
  $('#boardAnchor').after(`<div class="list-container">
  <div class="list" data-list-id=${list.id} id=${list.id}>
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=${list.id}>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`);


}

function renderCard(card) {
  var list = $('#'+card.idList+' .list-cards');
  list.append(`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    <!-- CARD NAME GOES HERE -->
    ${card.name}
  </div>
</div>`);
}
