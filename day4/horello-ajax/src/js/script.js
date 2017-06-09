// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

$.ajaxSetup({
	data: {
		key: "1cc74de769bff1dcdd5f46400cebb1fa",
		token: "6371b685e35d090c35c9d0771d84988054851eaf4d53850a29c0ec797ef3949b",
		idBoard: "5939c6693423e36af3b61caa"
	}
});
var interval = setInterval(function() {
	console.log('here');
	render();
}, 1000);
 
function createList(listName) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/lists`, {
  	method: 'POST',
	  data: {
	    name: listName
	  },
	  success: function(data) { 
	  	render(); 
	  }
	});
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards`, {
  	method: 'POST',
	  data: {
	    name: name,
	    idList: listId
	  },
	  success: function(data) { 
	  	render(); 
	  }
	});
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
  	method: 'PUT',
	  data: {
	    name: title,
	    desc: desc
	  },
	  success: function(data) { 
	  	render(); 
	  }
	});
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939c6693423e36af3b61caa', {
	  data: {
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
  var boardId = board.id;
  $('#boardAnchor').empty();
  $('#boardAnchor').append($('<div id="${boardId}" class="board"></div>'));
  board.lists.forEach(function(list) {
  	renderList(list);
  })
  board.cards.forEach(function(card) {
  	renderCard(card);
  })
}

function renderList(list) {
  // YOUR CODE HERE
  var id = list.id;
  var name = list.name;
  var html = $(`<div class="list-container">
  <div class="list" data-list-id="${id}" id="${id}">
    <div class="list-header">
      <span class="list-title">${name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid="${id}">Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm${id}">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${id}" />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${id}">Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${id}"></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`);
	$('#boardAnchor .board').append(html);
}

function renderCard(card) {
  // YOUR CODE HERE
  var idCard = card.id;
  var desc = card.desc;
  var name = card.name;
  var idList = card.idList;
  var html = $(`<div id="${idCard}" class="card" data-card-desc="${desc}" data-card-name="${name}" data-list-id="${idList}" data-card-id="${idCard}"> 
  	<div class="card-body"> ${name} </div></div>`);
  $(`#${idList}`).children('.list-cards').append(html);
}
