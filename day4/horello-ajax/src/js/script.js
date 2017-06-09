// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
$.ajaxSetup({
  data:{
  	key: apiKey,
  	token: apiToken
  }
});

$(document).ready(function() {
  setEventListeners();
  render();
  setInterval(render, 30000);
});

function removeCard(cardId) {
  console.log(cardId);
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
    method: 'DELETE',
    success: function(data) {
      render();
    },
    error: function(err) {
      alert('error occured, couldn\'t update card');
    }
  });
}

function createList(listName) {
  // YOUR CODE HERE
    $.ajax(apiUrl + '/lists', {
  	method: 'POST',
  	data: {
  		name: listName,
  		idBoard: boardId
  	},
  	success: function(data) {
  		render();
  	},
  	error: function(err) {
  		alert('error occured, couldn\'t create list');
  	}
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
    $.ajax(`https://api.Trello.com/1/cards/`, {
  	method: 'POST',
  	data: {
  		name: name,
  		idList: listId
  	},
  	success: function(data) {
  		render();
  	},
  	error: function(err) {
  		alert('error occured, couldn\'t create card');
  	}
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
  	method: 'PUT',
  	data: {
  		id: cardId,
  		name: title,
  		desc: desc
  	},
  	success: function(data) {
  		render();
  	},
  	error: function(err) {
  		alert('error occured, couldn\'t update card');
  	}
  });
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939c4f59dda7795ba3470b8', {
  	data: {
  		cards: 'all',
  		lists: 'all'
  	},
  	success: function(data) {
  		renderBoard(data);
  	},
  	error: function(err) {
  		alert('error occured, couldn\'t render');
  	}
  });
}

function renderBoard(board) {
  // YOUR CODE HERE
  $('#boardAnchor').empty();
  $('#boardAnchor').append(`<div id=${boardId} class="board"></div>`);

  $.map(board.lists, function(value, i) {
  	renderList(value);
  });

  $.map(board.cards, function(value, i) {
  	renderCard(value);
  });
}

function renderList(list) {
  // YOUR CODE HERE
  $('#' + list.idBoard).append(`<div class="list-container">
  	<div class="list" data-list-id=${list.id} id=${list.id}>
  	<div class="list-header">
  	<span class="list-title">${list.name}</span>
  	</div>
  	<div class="list-cards"></div>
  	<div class="list-footer">
  	<button class="add-card" addcardid=${list.id}>Add a card...</button>
  	<div class="collapse add-card-form-wrapper" id="addCardForm${list.id}">
  	<div class="well add-card-form">
  	<input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list.id}" />
  	<button type="button" class="btn btn-default add-card-save" id="addCardBtn${list.id}">Save</button>
  	<button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list.id}"></span></button>
  	</div>
  	</div>
  	</div>
  	</div>
  	</div>`);
}

function renderCard(card) {
  // YOUR CODE HERE

  $(`#${card.idList} .list-cards`).append(`<div id=${card.id} class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  	<div class="card-body">
  	${card.name}
  	</div>
  	</div>`);
   $(`#${card.id}`).prepend('<button class="close-button col-xs-offset-11"><span class="glyphicon glyphicon-remove"></span></button>')
}
