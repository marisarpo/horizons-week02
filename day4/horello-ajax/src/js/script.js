// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
  setInterval(render,3000);
});
$.ajaxSetup({
  data:{
    key:apiKey,
    token:apiToken
  }
})
function createList(listName) {
  $.ajax(apiUrl+'/lists/',{
    method: 'POST',
    data:{
      name:listName,
      idBoard:boardId,
      pos:"bottom"
    },
    success: function(obj){
      render(); },
    error: function(err){
      console.log('ERROR',err)
    }
    });
}

function createCard(name, listId) {
  $.ajax(apiUrl+'/cards/',{
    method: 'POST',
    data:{
      name:name,
      idList:listId,
      idBoard:boardId,
    },
    success: function(obj){
      render(); },
    error: function(err){
      console.log('ERROR',err)
    }
    });
}

function updateCard(title, desc, cardId) {
  $.ajax(apiUrl+'/cards/' + cardId,{
    method: 'PUT',
    data:{
      id:cardId,
      desc:desc,
      name:title
    },
    success: function(obj){
      render(); },
    error: function(err){
      console.log('ERROR',err)
    }
    });
  }




function render() {
  $.ajax(apiUrl+'/boards/'+boardId, {
  data: {
    // key: "40eb4f6bc6056649051a5515f59cc3bf",
    // token: "4c69dee9a31a624d040316cd509b76e717a230817924071da0bbfaabd0d569f5",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    renderBoard(data);
  },
  error: function(err){
    console.log("ERROR",err);
  }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);

  board.lists.forEach(function(item){
    //console.log(item)
    renderList(item);
  })
  board.cards.forEach(function(item){
    renderCard(item);
  })
}

function renderList(list) {
  var text = `<div class="list-container">
                <div class="list" data-list-id=${list.id} id=${list.id}>
                  <div class="list-header">
                    <span class="list-title">${list.name}</span>
                  </div>
                  <div class="list-cards"></div>
                  <div class="list-footer">
                    <button class="add-card" addcardid=${list.id}>Add a card...</button>
                    <div class="collapse add-card-form-wrapper" id=${'addCardForm'+list.id}>
                      <div class="well add-card-form">
                        <input type="text" class="form-control" placeholder="Card title" id=${'addCardTitle'+list.id} />
                        <button type="button" class="btn btn-default add-card-save" id=${'addCardBtn'+list.id}>Save</button>
                        <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id=${"addCardCancelBtn"+list.id}></span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
    $('#boardAnchor').find('.board').append(text);
}

function renderCard(card) {
  var text = `<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
                <div class="card-body">
                  ${card.name}
                </div>
              </div>`
  var tag = '#'
  var listid = card.idList
  //console.log(listid);
  $(tag.concat(listid)).find('.list-cards').append(text);
}
