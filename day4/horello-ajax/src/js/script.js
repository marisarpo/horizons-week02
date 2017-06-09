// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
}

function createCard(name, listId) {
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939ca1527151045426efe4e', {
  data: {
    key: "99accdbddaf252464749cea66556f8c6",
    token: "cf0f9319ec9df805b9c126f6ac6f9753843d873dff6c7d82202d97a1b0adbc7e",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) { renderBoard(data) }
});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="${'+board.id+'}" class="board"></div>');
  for(var i = 0; i < board.lists.length; i++){
    renderList(board.lists[i]);
  }
  for(var i = 0; i < board.cards.length; i++){
    renderCard(board.cards[i]);
  }
}

function renderList(list) {
  var listId = list.id;
  var listName = list.name;
  var newElem = '<div class="list-container">'
  + '<div class="list" data-list-id="'+listId+'" id="'+listId+'">'
  +  '<div class="list-header">'
  +    '<span class="list-title">'+listName+'</span>'
  +  '</div>'
  +  '<div class="list-cards"></div>'
  +  '<div class="list-footer">'
  +    '<button class="add-card" addcardid="'+listId+'">Add a card...</button>'
  +    '<div class="collapse add-card-form-wrapper" id="addCardForm '+listId+'">'
  +      '<div class="well add-card-form">'
  +        '<input type="text" class="form-control" placeholder="Card title" id="addCardTitle '+listId+'" />'
  +        '<button type="button" class="btn btn-default add-card-save" id="addCardBtn '+listId+'">Save</button>'
  +        '<button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn '+listId+'"></span></button>'
  +      '</div>'
  +    '</div>'
  +  '</div>'
  +'</div>'
  +'</div>';

  $('#boardAnchor').after(newElem);
}

function renderCard(card) {
  var listId = card.idList;
  var cardId = card.id;
  var cardDesc = card.desc;
  var cardName = card.name;
  var newElem =
  '<div id="'+cardId+'" class="card" data-card-desc="'+cardDesc+'" data-card-name="'+cardName+'" data-list-id="'+listId+'" data-card-id="'+cardId+'">'
  + '<div class="card-body">'
  +  cardName
  + '</div>'
  + '</div>';
  $('#' +listId + ' .list-cards').append(newElem);
}
