// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

var listId = null;

$(document).ready(function() {
  setEventListeners();
  render();
});

function deleteCard(cardId) {
	$.ajax({
	  	method: 'DELETE',
	  	url: `https://api.Trello.com/1/cards/${cardId}`,
	  	data: {
	  		key: "062af8f1e0932c8c66abc921587b7338",
		    token: "477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d",
	  	},
	  	success: function(event){
	  		render();
	  	},
	  	error: function(err) {
	  		alert("Error: Cannot reach server.");
	  	}
	})
}
// function deleteList(listId) {
// 	$.ajax({
// 	  	method: 'PUT',
// 	  	url: `https://api.Trello.com/1/lists/${listId}/closed`,
// 	  	data: {
// 	  		key: "062af8f1e0932c8c66abc921587b7338",
// 		    token: "477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d",
// 	  		value: false
// 	  	},
// 	  	success: function(event){
// 	  		render();
// 	  	},
// 	  	error: function(err) {
// 	  		alert("Error: Cannot reach server.");
// 	  	}
// 	})
// }

function createList(listName) {
  $.ajax({
  	method: 'POST',
  	url: `https://api.Trello.com/1/lists/`,
  	data: {
  		key: "062af8f1e0932c8c66abc921587b7338",
	    token: "477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d",
  		name: listName,
  		idBoard: "5939c4224f4b3861e13fc375",
  		pos: 'bottom'
  	},
  	success: function(event){
  		render();
  	},
  	error: function(err) {
  		alert("Error: Cannot reach server.");
  	}
  })
}

function createCard(name, listId) {
  $.ajax({
  	method: 'POST',
  	url: `https://api.Trello.com/1/lists/${listId}/cards`,
  	data: {
  		key: "062af8f1e0932c8c66abc921587b7338",
	    token: "477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d",
  		name: name
  	},
  	success: function(event){
  		render();
  	},
  	error: function(err) {
  		alert("Error: Cannot reach server.");
  	}
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
  	method: 'PUT',
  	url: `https://api.Trello.com/1/cards/${cardId}`,
  	data: {
  		key: "062af8f1e0932c8c66abc921587b7338",
	    token: "477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d",
  		desc: desc,
  		name: title
  	},
  	success: function(event){
  		render();
  	},
  	error: function(err) {
  		alert("Error: Cannot reach server.");
  	}
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939c4224f4b3861e13fc375', {
	  data: {
	    key: "062af8f1e0932c8c66abc921587b7338",
	    token: "477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d",
	    cards: 'all',
	    lists: 'all'
	  },
	  success: function(data) {
	  	renderBoard(data);
	  }
	});
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id="${boardId}" class="board"></div>`);
  for (var i = 0; i < board.lists.length; i++) {
  	renderList(board.lists[i]);
  }
  for (var i = 0; i < board.cards.length; i++) {
  	renderCard(board.cards[i]);
  }
}
//	<button class="delete-list btn">\
// 		<glyphicon class="remove-list-icon glyphicon glyphicon-remove"></glyphicon>\
// 	</button>\

function renderList(list) {
  var newList = `<div class="list-container">\
				  <div class="list" data-list-id="${list.id}" id="${list.id}">\
				    <div class="list-header">\
				      <span class="list-title">${list.name}</span>\
				    </div>\
				    <div class="list-cards"></div>\
				    <div class="list-footer">\
				      <button class="add-card" addcardid="${list.id}">Add a card...</button>\
				      <div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">\
				        <div class="well add-card-form">\
				          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />\
				          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>\
				          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>\
				        </div>\
				      </div>\
				    </div>\
				  </div>\
				</div>`;
	$(`#${boardId}`).append(newList);
}
function renderCard(card) {
  var newCard = `<div id="{card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">\
				  <div class="card-body">\
				    ${card.name}\
				    <button class="delete-card btn">\
				    	<glyphicon class="remove-card-icon glyphicon glyphicon-remove"></glyphicon>\
				    </button>\
				  </div>\
				</div>`;
  $(`#${card.idList} .list-cards`).append(newCard);
}
