// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: apiUrl + `/lists?name=${listName}&idBoard=${boardId}`,
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      pos: 'bottom'
    },
    success: function(resp){
      render();
    }
    })
}

function createCard(name, listId) {
  $.ajax({
    url: apiUrl + `/cards?idList=${listId}`,
    method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: name
    },
    success: function(resp){
      render();
    }
  })
}

function updateCard(title, desc, cardId) {
  console.log(title);
  console.log(desc);
  console.log(cardId);
  $.ajax({
    url: apiUrl + "/cards/" + cardId,
    method: 'PUT',
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      desc: desc
    },
    success: function(resp){
      console.log('updating!')
      render();
    }, error: function(e){
      console.log(e.responseText);
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/59bb1c76518f8a24ce609d53', {
    data: {
      key: "12e189f9a366fd33d56096bb774ba110",
      token: "cbd9d4f2abbd919c3493d7e148a1987fd471945f04198f6da72a8eb945897939",
      cards: 'all',
      lists: 'all'
    },
    success: function(resp) {
      renderBoard(resp);
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  var boardID = board.id;
  var boardHTML = '<div id="' + boardID + '" class="board"></div>';
  $('#boardAnchor').append(boardHTML);
  //Iterate through board.lists and pass each list object through the renderList function.
  board.lists.forEach(function(list){
    renderList(list);
  });
  board.cards.forEach(function(card){
    renderCard(card);
  });
}

function renderList(list) {
  var boardID = list.idBoard;
  console.log(boardID);
  var listID = list.id;
  var listName = list.name;
  var listWrapperHTML = '<div class="list-container"><div class="list" data-list-id="'+
    listID + '"id="' + listID
    + '"><div class="list-header"><span class="list-title">' + listName + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card" addcardid="'
    + listID + '">Add a card...</button><div class="collapse add-card-form-wrapper" id="addCardForm'
    + listID + '"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title" id="addCardTitle'
    + listID + '" /><button type="button" class="btn btn-default add-card-save" id="addCardBtn'
    + listID + '">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn'
    + listID + '"></span></button></div></div></div></div></div>';
  $('#' + boardID).append(listWrapperHTML);
}

function renderCard(card) {
  var cardID = card.id;
  var cardDescription = card.desc;
  var cardName = card.name;
  var listID = card.idList;
  var cardHTML = `<div id="` + cardID + `" class="card" data-card-desc="` +
    cardDescription + `" data-card-name="` + cardName + `" data-list-id="` + listID
    + `" data-card-id="` + cardID + `"><div class="card-body">` + cardName + `</div></div>`
  $('#'+ listID + ' .list-cards').append(cardHTML);
}
