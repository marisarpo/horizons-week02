// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax('https://api.Trello.com/1/lists', {
    type:"POST",
    data: {
      key: "4b98ac3bc537d0fe61f87f2d1132d2bc",
      token: "28081629dee22f691f22ded54c3f6b3498622757880affd09dbabcbe10277f0e",
      name: listName,
      idBoard: boardId
    },
    success: function(data) { render(); },
    error: function(err) {console.log("ERROR:",err);}
  });
}

function createCard(name, listId) {
  $.ajax('https://api.Trello.com/1/cards', {
    type:"POST",
    data: {
      key: "4b98ac3bc537d0fe61f87f2d1132d2bc",
      token: "28081629dee22f691f22ded54c3f6b3498622757880affd09dbabcbe10277f0e",
      name: name,
      idList: listId
    },
    success: function(data) { render(); },
    error: function(err) {console.log("ERROR:",err);}
  });
}

function updateCard(title, desc, cardId) {
  $.ajax('https://api.Trello.com/1/cards/' + cardId, {
    type:"PUT",
    data: {
      key: "4b98ac3bc537d0fe61f87f2d1132d2bc",
      token: "28081629dee22f691f22ded54c3f6b3498622757880affd09dbabcbe10277f0e",
      name: title,
      desc: desc
    },
    success: function(data) { render(); },
    error: function(err) {console.log(err);}
  });
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/58b343343a434072f52f16ab', {
    data: {
      key: "4b98ac3bc537d0fe61f87f2d1132d2bc",
      token: "28081629dee22f691f22ded54c3f6b3498622757880affd09dbabcbe10277f0e",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) { renderBoard(data) }
  });
}

function renderBoard(board) {

  $("#boardAnchor").empty();
  var boardDiv = $("<div id='" + board.id + "' class='board'></div>");
  $("#boardAnchor").append(boardDiv);
  
  board.lists.forEach(function(list) {
    renderList(list);
  })
  board.cards.forEach(function(card) {
    renderCard(card);
  })

}

function renderList(list) {
  var id = list.id;
  var name = list.name;
  var boardId = "#" + list.idBoard;
  var listDiv = $(`<div class="list-container">
                    <div class="list" data-list-id="`+id+`" id="`+id+`">
                      <div class="list-header">
                        <span class="list-title">`+name+`</span>
                      </div>
                      <div class="list-cards"></div>
                      <div class="list-footer">
                        <button class="add-card" addcardid="`+id+`">Add a card...</button>
                        <div class="collapse add-card-form-wrapper" id="addCardForm`+id+`">
                          <div class="well add-card-form">
                            <input type="text" class="form-control" placeholder="Card title" id="addCardTitle`+id+`" />
                            <button type="button" class="btn btn-default add-card-save" id="addCardBtn`+id+`">Save</button>
                            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn`+id+`"></span></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`);
  $(boardId).append(listDiv);

}

function renderCard(card) {
  var id = card.id;
  var name = card.name;
  var desc = card.desc;
  var listId = card.idList;

  var cardDiv = $(`<div id="`+id+`" class="card" data-card-desc="`+desc+`" data-card-name="`+name+`" data-list-id="`+listId+`" data-card-id="`+id+`">
                  <div class="card-body">
                    `+name+`
                  </div>
                </div>`);
  $("#" + listId).children(".list-cards").append(cardDiv);





}
