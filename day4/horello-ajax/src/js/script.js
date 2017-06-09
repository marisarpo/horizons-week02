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
  $.ajax(apiUrl + "/cards/" + cardId, {
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    method:"PUT",
    success: function(data) {
      render();
    }.bind(this)
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939c55c7adb450f92af1f1d', {
    data: {
      key: "918ffd0fb17b0eb4f1ea9b3aca401cb6",
      token: "0935dab413f586ab0c8e9a9ff25f9d1aed1b6a49b2ed355ccadceb08cf0eaf0c",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  var newDiv = $('<div id="5939c55c7adb450f92af1f1d" class="board"></div>')
  $('#boardAnchor').append(newDiv);
  board.lists.forEach(function(list) {
    renderList(list);
  })
  board.cards.forEach(function(card) {
    renderCard(card);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var listDiv = $('<div class="list-container">'+
                    '<div class="list" data-list-id='+ list.id + ' id='+list.id + '>'+
                      '<div class="list-header">'+
                        '<span class="list-title">' + list.name + '</span>'+
                      '</div>'+
                      '<div class="list-cards"></div>'+
                      '<div class="list-footer">'+
                        '<button class="add-card" addcardid=' + list.id +'>Add a card...</button>'+
                        '<div class="collapse add-card-form-wrapper" id="addCardForm"'+list.id + '>'+
                          '<div class="well add-card-form">'+
                            '<input type="text" class="form-control" placeholder="Card title" id="addCardTitle"'+list.id + '/>'+
                            '<button type="button" class="btn btn-default add-card-save" id="addCardBtn"'+list.id + '>Save</button>'+
                            '<button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn"'+list.id + '></span></button>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>')
  $('#boardAnchor .board').append(listDiv);
}

function renderCard(card) {
  // YOUR CODE HERE
  var cardDiv = $('<div id='+card.id +' class="card" data-card-desc=' + card.description + ' data-card-name='+ card.name +' data-list-id='+card.idList+' data-card-id='+card.id+ '>' +
                    '<div class="card-body">'+
                      card.name +
                    '</div>'+
                  '</div>')
  $('#'+card.idList).find('.add-card').before(cardDiv);
}
