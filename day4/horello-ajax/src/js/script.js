// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();

});

$.ajaxSetup({
  data:{
    key: "b214ba1e82e82f390da816e3f47ace83",
    token: "854a7e63ba51225c4a0d80c2fe12b56a47515a919449eb7f67950399edeca04b"
  }
});

setInterval(function(){
    console.log('here');
    render(); // this will run after every 30 seconds
}, 30000);

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    url:`https://api.Trello.com/1/lists`,
    method:'POST',
    data:{
      //key: "b214ba1e82e82f390da816e3f47ace83",
      //token: "854a7e63ba51225c4a0d80c2fe12b56a47515a919449eb7f67950399edeca04b",
      //idCheckItem: cardId,
      name:listName,
      idBoard:"5939c7be23d7fcdc3f79ff9e",
      //desc:desc,
    },
    success:function(){
      render();
    }

  })

}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    url:`https://api.Trello.com/1/cards`,
    method:'POST',
    data:{
      //key: "b214ba1e82e82f390da816e3f47ace83",
      //token: "854a7e63ba51225c4a0d80c2fe12b56a47515a919449eb7f67950399edeca04b",
      //idCheckItem: cardId,
      name:name,
      idBoard:"5939c7be23d7fcdc3f79ff9e",
      idList:listId
      //desc:desc,
    },
    success:function(){
      render();
    }

  })

}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    url:`https://api.Trello.com/1/cards/${cardId}`,
    method:'PUT',
    data:{
      //key: "b214ba1e82e82f390da816e3f47ace83",
      //token: "854a7e63ba51225c4a0d80c2fe12b56a47515a919449eb7f67950399edeca04b",
      //idCheckItem: cardId,
      name:title,
      desc:desc,
    },
    success:function(){
      render();
    }

  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939c7be23d7fcdc3f79ff9e', {
  data: {
    //key: "b214ba1e82e82f390da816e3f47ace83",
    //token: "854a7e63ba51225c4a0d80c2fe12b56a47515a919449eb7f67950399edeca04b",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {  renderBoard(data) }
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('.list-container:not(:last-child)').remove();
  $('#boardAnchor').append(`<div id=${board.id} class="board"></div>`)
  for (var i = 0; i < board.lists.length; i++) {
    console.log(board.lists[i]);
    renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++) {
    renderCard(board.cards[i]);
  }

}

function renderList(list) {
  // YOUR CODE HERE
  var data=`<div class="list-container">
  <div class="list" data-list-id="${list.id}" id="${list.id}">
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list.id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`


  $('#boardAnchor').after(data);

}

function renderCard(card) {
  // YOUR CODE HERE
  var data=`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`
  var id='#'+card.idList;
  $(id).children('.list-cards').append(data);
}
