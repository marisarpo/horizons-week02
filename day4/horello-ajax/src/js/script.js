// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
  	url: apiUrl + '/lists',
  	method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId
    },
    success: function(response) {
      renderList(response)
    },
    error: function(error) {
      alert("Error occurred.");
    }
  })
}

function createCard(name, listId) {
  $.ajax({
  	url: apiUrl + '/cards',
  	method: 'POST',
    data: {
      key: apiKey,
      token: apiToken,
      name: name,
      idList: listId
    },
    success: function() {
      render();
    },
    error: function(error) {
      alert("Error occurred.");
    },
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
  	url: apiUrl + '/cards/' + cardId,
  	method: 'PUT',
    data: {
      key: apiKey,
      token: apiToken,
      name: title,
      id: cardId,
      desc: desc
    },
    success: function() {
      render();
    },
    error: function(error) {
      alert("Error occurred.");
    },
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/594c4e936e9235a9540167e5', {
	  data: {
	    key: "a9bf8e81903969ea512d5ae9dd52ed81",
	    token: "3bcbfbb4d55d80718f2dbfa67d6dffb8e872f123e9c79ce87e7f8448bea50203",
	    cards: 'all',
	    lists: 'all'
	  },
	  success: function(data) { renderBoard(data); }
	})
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div class='board' id=${boardId}></div>`);
  var lists = board.lists;
  lists.forEach(function(item) {
  	renderList(item)
  });
  var cards = board.cards;
  cards.forEach(function(item) {
  	renderCard(item)
  });
}

function renderList(list) {
  var listId = list.id;
  var newList = $(`<div class="list-container">
				  <div class="list" data-list-id="${listId}" id="${listId}">
				    <div class="list-header">
				      <span class="list-title">${list.name}</span>
				    </div>
				    <div class="list-cards"></div>
				    <div class="list-footer">
				      <button class="add-card" addcardid="${listId}">Add a card...</button>
				      <div class="collapse add-card-form-wrapper" id="addCardForm${listId}">
				        <div class="well add-card-form">
				          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${listId}" />
				          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${listId}">Save</button>
				          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${listId}"></span></button>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>`);
  $('#boardAnchor .board').append(newList);
}

function renderCard(card) {
  var cardId = card.id;
  var cardDesc = card.desc;
  var cardName = card.name;
  var listId = card.idList;
  var newCard = $(`<div id="${cardId}" class="card" data-card-desc="${cardDesc}" data-card-name="${cardName}" data-list-id="${listId}" data-card-id="${cardId}">
				  <div class="card-body">
				    ${cardName}
				  </div>
				</div>`);
  $('#' + listId + ' .list-cards').append(newCard);
}
