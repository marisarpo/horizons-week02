// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax(apiUrl+'/lists',{
      method: 'POST',
      data: {
        key: apiKey,
        token:apiToken,
        name: listName,
        idBoard: boardId
      },
      success:function(){
        render();
      }
  });
}

function createCard(name, listId) {
  $.ajax(apiUrl+'/cards',{
      method: 'POST',
      data: {
        key: apiKey,
        token:apiToken,
        name: name,
        idList: listId,
        idBoard: boardId
      },
      success:function(){
        render();
      }
  });
}

function updateCard(title, desc, cardId) {
  $.ajax(apiUrl+ '/card/'+ cardId,{
      method: 'PUT',
      data: {
        key: apiKey,
        token:apiToken,
        name: title,
        desc: desc
      },
      success:function(){
        render();
      }
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/59bb19a1122f8950ca0cc0e5', {
    data: {
      key: 'a0ab1c5c9f278f9dd35b39488ac9aa23',
      token: '4d93ff93ce02d45736b08d82903731dea8899b78be37ab3d8107770b1c599636',
      cards: 'all',
      lists: 'all'
    },
    success: function(data){
      renderBoard(data);
    }
  });

}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  board.lists.forEach(function(element){
    return renderList(element);
  });
  board.cards.forEach(function(element){
    return renderCard(element);
  });
}

function renderList(list) {
  var divlist = `<div class="list-container">
  <div class="list" data-list-id= ${list.id} id=${list.id}>
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
</div>`;
$('#'+list.idBoard).append(divlist);
}

function renderCard(card) {
  var divcard =`<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
  <div class="card-body">
    ${card.name}
  </div>
</div>`;
$('#'+ card.idList).find('.list-cards').append(divcard);
}
