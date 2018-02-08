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
  // YOUR CODE HERE
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5a6a88abda71f3c8b7efb85f', {
  data: {
    key: "fcc2ec1ad0cb1f41fbdcb7028b141a2d",
    token: "aa56577b3a6f338a5cc98903241a24ed74b35b3573cc946d5a9cb509c856d537",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    console.log(data)
    renderBoard(data)
  }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty()
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`)
  board.lists.forEach(function(item){
    renderList(item)
  })
  board.cards.forEach(function(item){
    renderCard(item)
  })
}

function renderList(list) {
  var x = (`<div class="list-container">
              <div class="list" data-list-id="`+list.id+`" id="`+list.id+`">
                <div class="list-header">
                  <span class="list-title">`+list.name+`</span>
                </div>
                <div class="list-cards"></div>
                <div class="list-footer">
                  <button class="add-card" addcardid="`+list.id+`">Add a card...</button>
                  <div class="collapse add-card-form-wrapper" id="addCardForm`+list.id+`">
                    <div class="well add-card-form">
                      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+list.id+`" />
                      <button type="button" class="btn btn-default add-card-save" id="addCardBtn`+list.id+`">Save</button>
                      <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+list.id+`"></span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`)
  $(`#${list.idBoard}`).append(x)
}

function renderCard(card) {
  var x = (`<div id=`+card.id+` class="card" data-card-desc=`+card.desc+` data-card-name=`+card.name+` data-list-id=`+card.idList+` data-card-id=`+card.id+`>
            <div class="card-body">
              `+card.name+`
            </div>
          </div>`)
  $(`#${card.idList}`).find('.list-cards').append(x)
}
