// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
method: 'POST',
url: 'https://api.trello.com/1/lists?name='+listName+'&idBoard='+boardId+'',
data: {
key: "074cffc2d1b43f86161b5a9c6261d0d1",
token: "7f7d18e1708b215234ab255a324f044c2de1028f6c95859c2dc4c2bfe13de57d",
name:listName,
},
success: render(),

})
}

function createCard(name, listId) {
  $.ajax({
method: 'POST',
url: 'https://api.trello.com/1/cards?idList='+listId+'',
data: {
key: "074cffc2d1b43f86161b5a9c6261d0d1",
token: "7f7d18e1708b215234ab255a324f044c2de1028f6c95859c2dc4c2bfe13de57d",
name:title,
},
success: render(),

})
}

function updateCard(title, desc, cardId) {
  $.ajax({
method: 'PUT',
url: 'https://api.trello.com/1/cards/'+cardId+'',
data: {
key: "074cffc2d1b43f86161b5a9c6261d0d1",
token: "7f7d18e1708b215234ab255a324f044c2de1028f6c95859c2dc4c2bfe13de57d",
name:title,
desc: desc
},
success: render(),

})
}

function render() {
  debugger
  $.ajax('https://api.Trello.com/1/boards/5a6a68634be86348eb645406', {
    data: {
      key: "074cffc2d1b43f86161b5a9c6261d0d1",
      token: "7f7d18e1708b215234ab255a324f044c2de1028f6c95859c2dc4c2bfe13de57d",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data)
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  var boardID = board.id;
  $('#boardAnchor').append($('<div id='+boardID+' class="board"> </div>'));
  board.lists.forEach(function(list){
    renderList(list);
  });
  board.cards.forEach(function(card){
    renderCard(card);
  });

}

function renderList(list) {
  var listID = list.id;
  var boardID = list.idBoard;
  $('#'+boardID).append($(`<div class="list-container">
  <div class="list" data-list-id=`+listID+` id=`+listID+`>
    <div class="list-header">
      <span class="list-title">`+list.name+`</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=`+listID+`>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm`+listID+`>
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+listID+`/>
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn`+listID+`>Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+listID+`></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`))
}

function renderCard(card) {

  var cardID = card.id;
  var listID = card.idList;
  var cardDesc = card.desc;
  var cardName = card.name;
  $('#'+listID).find('.list-cards').append($(`<div id=`+cardID+` class="card" data-card-desc=`+cardDesc+` data-card-name=`+cardName+` data-list-id=`+listID+` data-card-id=`+cardID+`>
  <div class="card-body">
    `+ cardName +`
  </div>
</div>`))
}
