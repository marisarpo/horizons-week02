// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});


function createList(listName) {

  $.ajax(`https://api.trello.com/1/lists?name=` + listName +`&idBoard=`+boardId, {
    success: function(x) {
      console.log("SUCCESS");
         render();
    },
    error: function(err) {
      console.log(err);
    },
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken
    },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  });

}

function createCard(name, listId) {

  $.ajax('https://api.trello.com/1/cards?idList=' + listId, {
    success: function(x) {
      console.log("SUCCESS");
         render();
    },
    error: function(err) {
      console.log(err);
    },
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: name
    },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  });
}

function updateCard(title, desc, cardId) {

  $.ajax('https://api.trello.com/1/cards/' + cardId, {
    success: function(x) {
      console.log("SUCCESS");
         render();
    },
    error: function(err) {
      console.log(err);
    },
    method: 'PUT',
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  });

}

function render() {
  var boardObj;
  $.ajax('https://api.Trello.com/1/boards/5a6a62f80773405870ddfb3b', {
    data: {
      key: apiKey,
      token:apiToken,
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    },
    error: function(error) {
      console.log(error);
    }
  });

}

function renderBoard(board) {
    $('.list-container').empty();
    var boardId = board.id;
    $('div#boardAnchor').append('<div id="' + boardId + '" class="board"></div>');
    board.lists.forEach(function(value, key) {
    renderList(value);
    });
    board.cards.forEach(function(value, key) {
    renderCard(value);
    });
}

function renderList(list) {
  var LISTIDHERE = list.id;
  var title = list.name;

  var newContent = `<div class="list-container">
      <div class="list" data-list-id="` + LISTIDHERE + `" id="` + LISTIDHERE + `">
        <div class="list-header">
          <span class="list-title">` + title + `</span>
        </div>
        <div class="list-cards"></div>
        <div class="list-footer">
          <button class="add-card" addcardid="` + LISTIDHERE + `">Add a card...</button>
          <div class="collapse add-card-form-wrapper" id="addCardForm` + LISTIDHERE + `">
            <div class="well add-card-form">
              <input type="text" class="form-control" placeholder="Card title" id="addCardTitle` + LISTIDHERE + `" />
              <button type="button" class="btn btn-default add-card-save" id="addCardBtn` + LISTIDHERE + `">Save</button>
              <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn` + LISTIDHERE + `"></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  $('#boardAnchor').before(newContent);
}

function renderCard(card) {
  var cardID = card.id;
  var cardName = card.name;
  var cardDescription = card.desc;
  var boardID = card.idBoard;
  var listID = card.idList;

  var newContent = `<div id="` + cardID + `" class="card" data-card-desc="` + cardDescription + `" data-card-name="` + cardName + `" data-list-id="` + listID + `" data-card-id="` + cardID + `">
      <div class="card-body">
        ` + cardName + `
      </div>
    </div>`;

  $(`.list#` + listID).children().eq(1).append(newContent);
}
