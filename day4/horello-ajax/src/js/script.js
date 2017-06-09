// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  console.log(listName)
  $.ajax(`https://api.Trello.com/1/boards/OuNhQWBW/lists`, {
    type:'POST',
    data: {
      key: "e5c246abb7839778d60311287776f25b",
      token: "7c215319b76350f655edbfbe8c0c6e3ca6f921f2f8a4e8f67c252b31ab98d360",
      //if don't want to write that each time can use a setup ajax function
        //-but then that can lead to conflicts
      name: listName,
    },
    success: render
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/lists/${listId}/cards`, {
    type:'POST',
    data: {
      key: "e5c246abb7839778d60311287776f25b",
      token: "7c215319b76350f655edbfbe8c0c6e3ca6f921f2f8a4e8f67c252b31ab98d360",
      //if don't want to write that each time can use a setup ajax function
        //-but then that can lead to conflicts
      name: name,
    },
    success: render
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
//use the same url below but change to /cards

//you use data for put
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
    type:'PUT',
    data: {
      key: "e5c246abb7839778d60311287776f25b",
      token: "7c215319b76350f655edbfbe8c0c6e3ca6f921f2f8a4e8f67c252b31ab98d360",
      //if don't want to write that each time can use a setup ajax function
        //-but then that can lead to conflicts
      name: title,
      desc: desc
    },
    success: render
  })

}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/OuNhQWBW', {

  data: {
    key: "e5c246abb7839778d60311287776f25b",
    token: "7c215319b76350f655edbfbe8c0c6e3ca6f921f2f8a4e8f67c252b31ab98d360",
    cards: 'all',
    lists: 'all'
  },
  success: function(data) {
    console.log(data)
    renderBoard(data);
    // return data;
  }
});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div class="board" id="boardID"></div>`)
  for (var i = 0; i < board.lists.length; i++) {
    renderList(board.lists[i]);


  }
  for (var i = 0; i < board.cards.length; i++) {
    renderCard(board.cards[i]);
  }
}


function renderList(list) {
  // YOUR CODE HERE
  var newlist=`<div class="list-container">
  <div class="list" data-list-id="${list['id']}" id="${list['id']}">
    <div class="list-header">
      <span class="list-title">${list['name']}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${list['id']}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${list['id']}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list['id']}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list['id']}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list['id']}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`
$('#boardAnchor .board').append(newlist);
//append adds inside, after adds after
}

function renderCard(card) {
  // YOUR CODE HERE

  var newcard=`<div id="${card['id']}" class="card" data-card-desc="${card['desc']}" data-card-name="${card['name']}" data-list-id="${card['idList']}" data-card-id="${card['id']}">
    <div class="card-body">
      ${card['name']}
    </div>
  </div>`;
console.log(card['idList'])
  $(`#${card['idList']} .list-cards`).append(newcard);
}
