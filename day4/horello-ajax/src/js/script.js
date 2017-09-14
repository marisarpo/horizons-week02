// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
  pollServer();
});


function pollServer(){
  setInterval(render, 30000)
}
function createList(listName) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/lists', {
    data: {
      idBoard: boardId,
      name: listName
    },
    method: 'POST',
    success: function(){
      render();
    },
    error: function(err){
      render();
    }
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards', {
    data: {
      idList: listId,
      name: name
    },
    method: 'POST',
    success: function(){
      render();
    },
    error: function(err){
      render();
    }
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    data: {
      name: title,
      desc: desc
    },
    method: 'PUT',
    success: function(){
      render();
    },
    error: function(err){
      render();
    }
  })
}

function render() {
  // YOUR CODE HERE

  $.ajaxSetup({
    data: {
      key: apiKey,
      token: apiToken
    }
  });
  $.ajax('https://api.Trello.com/1/boards/' + boardId, {
  data: {
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data)},
  error: function(){
    render();
  }
});
}

function renderBoard(board) {
  // YOUR CODE HERE

  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="$`+ boardId +`" class="board"></div>`);
  board.lists.forEach(function(list){
    if(!list.closed){
      renderList(list);
    }

  });

  board.cards.forEach(function(card){
    renderCard(card);
  })

  $('.list-cards').sortable({
    connectWith: '.list-cards',
    update: function(event, ui){


      var childArray = $(this).children();

      var cardId = $(ui.item[0]).attr('id');
      var listId = $(this).closest('.list').attr('id');
      var position;
      childArray.each(function(index){
        if(childArray.eq(index).is($(ui.item[0]))){
          position = index;
        }
      });
      // console.log(position);
      $.ajax('https://api.Trello.com/1/cards/' + cardId, {
        data:{
          idList: listId,
          pos: position
        },
        method: "PUT",
        success: function(){
          render();
        }
      })

    }
  }).disableSelection();

}

function renderList(list) {
  // YOUR CODE HERE
  var listHtml = `<div class="list-container">
  <div class="list" data-list-id="` + list.id +`" id="`+ list.id + `">
    <div class="list-header">
      <span class="list-title">`+ list.name + `</span>
        <span class= "delete-list glyphicon glyphicon-remove" style=" margin-top: 5px; position:relative; z-index: 10"></span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="`+ list.id +`">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm`+ list.id +`">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+ list.id +`" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn`+ list.id +`">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+ list.id +`"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`
$('#boardAnchor .board').append(listHtml);
}
function deleteList(listId){
  console.log(listId);
  $.ajax('https://api.Trello.com/1/lists/' + listId + '/closed', {
    method: 'PUT',
    data: {
      value: true
    },
    success: function(){
      render();
    },
    error: function(err){
      console.log(err);
    }
  })
}

function renderCard(card) {
  // YOUR CODE HERE
  var cardHtml = `<div id="`+ card.id +`" class="card" data-card-desc="`+ card.desc + `" data-card-name="`+ card.name + `" data-list-id="`+ card.idList + `" data-card-id="`+ card.id +`">
  <span class= "delete-card glyphicon glyphicon-remove" style="float:right; margin-right: 3px; margin-top: 3px; position:relative; z-index: 10"></span>
  <div class="card-body">
    `+ card.name + `
  </div>
</div>`
$(' #' + card.idList).children('.list-cards').append(cardHtml);
}

function deleteCard(cardId){
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    method: 'DELETE',
    success: function(){
      render();
    }
  })
}
