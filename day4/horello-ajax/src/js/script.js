// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

var boardId = "5939d46bb0a8c78a692e967f";


$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: "https://api.trello.com/1/lists",
    method: "POST",
    data: {
      key: "33db3ab23ca942380ba2410e3fd9c6af",
      token: "a79ba806fca6cccf10b114372826cec4c3cef4c33f2974e93a268089da1d1275",
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function() {
      render()
    },
    error: function(error) {
      console.log("somethin went wrong", error);
    }
  })
}


function createCard(name, listId) {
  $.ajax({
    url: "https://api.trello.com/1/cards",
    method: "POST",
    data: {
      key: "33db3ab23ca942380ba2410e3fd9c6af",
      token: "a79ba806fca6cccf10b114372826cec4c3cef4c33f2974e93a268089da1d1275",
      name: name,
      pos: "bottom",
      idList: listId
    },
    success: function() {
      render()
    },
    error: function(error) {
      console.log("somethin went wrong", error);
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url: "https://api.trello.com/1/cards/" + cardId,
    method: "PUT",
    data: {
      key: "33db3ab23ca942380ba2410e3fd9c6af",
      token: "a79ba806fca6cccf10b114372826cec4c3cef4c33f2974e93a268089da1d1275",
      name: title,
      desc: desc,
    },
    success: function() {
      render()
    },
    error: function(error) {
      console.log("somethin went wrong", error);
    }
  })
}



function render() {
  $.ajax('https://api.Trello.com/1/boards/5939d46bb0a8c78a692e967f', {
    data: {
      key: "33db3ab23ca942380ba2410e3fd9c6af",
      token: "a79ba806fca6cccf10b114372826cec4c3cef4c33f2974e93a268089da1d1275",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data)
    }
  });
}



function renderBoard(board) {
  $("#boardAnchor").empty();
  $("#boardAnchor").append('<div id="'+boardId+'" class="board"></div>');
  for(var list of board.lists) {
    renderList(list)
  }
  for(var card of board.cards) {
    renderCard(card)
  }
}



function renderList(list) {
  var lid = list.id
  var listWrapper = $('\
  <div class="list-container">\
    <div class="list" data-list-id="'+lid+'" id="'+lid+'">\
      <div class="list-header">\
        <span class="list-title">'+list.name+'</span>\
      </div>\
      <div class="list-cards"></div>\
      <div class="list-footer">\
        <button class="add-card" addcardid="'+lid+'">Add a card...</button>\
        <div class="collapse add-card-form-wrapper" id="addCardForm'+lid+'">\
          <div class="well add-card-form">\
            <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+lid+'" />\
            <button type="button" class="btn btn-default add-card-save" id="addCardBtn'+lid+'">Save</button>\
            <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+lid+'"></span></button>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>\
  '
  )
  $("#"+ boardId).append(listWrapper)
}



function renderCard(card) {
  var cardWrapper = $('\
  <div id="'+card.id+'" class="card" data-card-desc="'+card.desc+'" data-card-name="'+card.name+'" data-list-id="'+card.idList+'" data-card-id="'+card.id+'">\
    <div class="card-body">\
      '+card.name+'\
    </div>\
  </div>\
  '
  )

  $(".list-cards, #" + card.idList).find(".list-cards").append(cardWrapper)



}
