// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$.ajaxSetup({
 	key: apiKey,
 	token: apiToken
});

$(document).ready(function() {
  setEventListeners();
  render();
  setInterval(render, 30000);
});

function createList(listName) {
  	$.ajax(`https://api.Trello.com/1/lists/`, {
		data: {
			name: listName,
			idBoard: boardId
		},
		method: 'POST',
		success: function(data) { 
			render();
		},
		error: function(err) {
			alert("An error occurred! Try again later.");
		}
	});
}

function createCard(name, listId) {
  	$.ajax(`https://api.Trello.com/1/cards/`, {
		data: {
			name: name,
			idList: listId
		},
		method: 'POST',
		success: function(data) { 
			render();
		},
		error: function(err) {
			alert("An error occurred! Try again later.");
		}
	});
}

function updateCard(title, desc, cardId) {
  $.ajax({
  	url: `https://api.Trello.com/1/cards/${cardId}`,
  	method: 'PUT',
  	data: {
		name: title,
		desc: desc,
		id: cardId,
	 	key: apiKey,
	 	token: apiToken
	},
	success: function(resp) {
		console.log(resp);
		render();
	},
	error: function(err) {
		alert("An error occurred! Try again later.");
	}
  });
}

function render() {
	$.ajax(`https://api.Trello.com/1/boards/${boardId}`, {
		data: {
			cards: 'all',
			lists: 'all'
		},
		success: function(data) { 
			renderBoard(data);
		},
		error: function(err) {
			alert("An error occurred! Try again later.");
		}
	});
}

function renderBoard(board) {
	var anchor = $('#boardAnchor');
  	anchor.empty();
  	anchor.append(`<div id="${boardId}" class="board"></div>`);
  	board.lists.forEach(function(item) {
  		renderList(item);
  	});
  	board.cards.forEach(function(item) {
  		renderCard(item);
  	});
}

function renderList(list) {
  	var listDiv = `<div class="list-container">
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
        </div>`;


   	$('#'+boardId).append(listDiv);
}

function renderCard(card) {
 	var cardDiv = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
          <div class="card-body">
            ${card.name}
          </div>
        </div>`;
   	$('#'+card.idList).find('.list-cards').append(cardDiv);
}





















