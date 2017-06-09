// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
	$.ajax(`https://api.Trello.com/1/lists`, {
		type: "POST",
		data: {
			key: "4aaee061949ee498e062b56aac86b893",
			token: "0da072d8ba400b4f24a45d5c8c900e583acda687a676edc36da3ef581e5032b0",
			name: listName,
			idBoard: "5939d6b6c01c31ab5863e74c",
			
		},

		success: function(list) {
			render();
		}
	})
}

function createCard(name, listId) {
  $.ajax(`https://api.Trello.com/1/cards`, {
		type: "POST",
		data: {
			key: "4aaee061949ee498e062b56aac86b893",
			token: "0da072d8ba400b4f24a45d5c8c900e583acda687a676edc36da3ef581e5032b0",
			name: name,
			idList: listId,
			
		},

		success: function(list) {
			render();
		}
	})
}

function updateCard(title, desc, cardId) {
  $.ajax(`https://api.Trello.com/1/cards/${cardId}`, {
  	type: "PUT",
  	data: {
  		key: "4aaee061949ee498e062b56aac86b893",
		token: "0da072d8ba400b4f24a45d5c8c900e583acda687a676edc36da3ef581e5032b0",
		name: title,
		desc: desc
	},

	success: function(worked) {
		render();
	},
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/5939d6b6c01c31ab5863e74c', {
	  data: {
	    key: "4aaee061949ee498e062b56aac86b893",
	    token: "0da072d8ba400b4f24a45d5c8c900e583acda687a676edc36da3ef581e5032b0",
	    cards: 'all',
	    lists: 'all'
	  },
	  success: function(data) { renderBoard(data) }
	});
}

function renderBoard(board) {
	// console.log(board);
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="${boardId}" class="board"></div>');
  board.lists.forEach(function(list) {renderList(list)})
  board.cards.forEach(function(card) {renderCard(card)})
}

function renderList(list) {
	// console.log(list)
	 $('#boardAnchor .board').append(`<div class="list-container">
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
	</div>`)
}

function renderCard(card) {
	var html = (`<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="card["idList"]" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name} 
  </div>
</div>`)
	var rt = card["idList"];
	$("#"+rt).find('.list-cards').append(html)
}
