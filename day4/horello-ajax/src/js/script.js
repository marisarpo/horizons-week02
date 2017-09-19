// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
    url: apiUrl + `/lists?name=${listName}&idBoard=${boardId}`,
    method: 'POST',
    data: {
      key: "848cd795d41d4677cf0a0ef115d0673b",
      token: "93526e82b1e2710a30990ccf818149604d77c8e0f676dcd3205c9ec54f237d8c",
      pos: 'bottom'

    },
    success: function(resp){
      render();
    }
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
    url: apiUrl + `/cards?idList=${listId}`,
    method: 'POST',
    data: {
      key: "848cd795d41d4677cf0a0ef115d0673b",
      token: "93526e82b1e2710a30990ccf818149604d77c8e0f676dcd3205c9ec54f237d8c",
      name: name

    },
    success: function(resp){
      render();
    }
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
    url: apiUrl + "/cards/" + cardId,
    method: 'PUT',
    data: {
      key: "848cd795d41d4677cf0a0ef115d0673b",
      token: "93526e82b1e2710a30990ccf818149604d77c8e0f676dcd3205c9ec54f237d8c",
      name: title,
      desc: desc

    },
    success: function(resp){
      render();
    }
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/59bb1bded97af1cefa04f21c', {
  data: {
    key: "848cd795d41d4677cf0a0ef115d0673b",
    token: "93526e82b1e2710a30990ccf818149604d77c8e0f676dcd3205c9ec54f237d8c",
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
  // YOUR CODE HERE

  var html = `<div id="${boardId}" class="board"></div>`;
  $('#boardAnchor').empty();
  $('#boardAnchor').append(html);
  board.lists.forEach(function(list){
    renderList(list)
  })
  board.cards.forEach(function(card){
    renderCard(card)
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var id = list.id;
  var name = list.name
  var html = `<div class="list-container">
  <div class="list" data-list-id=${id} id="${id}">
    <div class="list-header">
      <span class="list-title">${name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`
console.log(list);

$(`#${list.idBoard}`).append(html)
}

function renderCard(card) {
  console.log(card);
  // YOUR CODE HERE
  var id = card.id
  var name = card.name
  var description = card.description
  var listId = card.idList
  var html = `<div id="${id}" class="card" data-card-desc="${description}" data-card-name="${name}" data-list-id="${listId}" data-card-id="${id}">
  <div class="card-body">
    ${name}
  </div>
</div>`
$('#' +  listId).find('.list-cards').append(html)
console.log(html);
}
