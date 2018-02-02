// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function render() {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + '/boards/' + boardId,
  	method: 'GET',
  	data: {
	    key: apiKey,
	    token: apiToken,
	    cards: 'all',
	    lists: 'all'
  	},
  	success: function(data) {
  	  renderBoard(data)
  	  console.log(data)
  	}
  });
}

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + '/lists/',
  	method: "POST",
  	data:{
	    key: apiKey,
	    token: apiToken,
	    name: listName,
	    idBoard: boardId,
	    pos: 0,
  	},
  	success: function(data) {
  		console.log(data);
  		render();
  	},

  	error: function(err) {
  		console.log(err)
  	},
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + '/cards/',
  	method: "POST",
  	data:{
	    key: apiKey,
	    token: apiToken,
	    name: name,
	    idBoard: boardId,
	    idList: listId
  	},
  	success: function(data) {
  		console.log(data);
  		render();
  	},

  	error: function(err) {
  		console.log(err)
  	},
  })  
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + '/cards/' + cardId,
  	method: "PUT",
  	data:{
	    key: apiKey,
	    token: apiToken,
	    name: title,
	    desc: desc,
	    pos: 10,
  	},
  	success: function(data) {
  		render();
  	},

  	error: function(err) {
  		console.log(err)
  	},
  })
}

function renderBoard(board) {
  // YOUR CODE HERE
  $("#boardAnchor").empty();
  $("#boardAnchor").append(`<div id="${board.id}" class="board"></div>`);
  $.each(board.lists, function(i) {
  	renderList(board.lists[i]);
  });
  $.each(board.cards, function(j) {
  	renderCard(board.cards[j]);
  });
}

function renderList(list) {
  // YOUR CODE HERE
  var htmlList = `<div class="list-container">
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

	$("#" + list.idBoard).append(htmlList);
}

function renderCard(card) {
  // YOUR CODE HERE
  var htmlCard = `<div id="${card.id}" class="card" data-card-desc="${card.desc}" data-card-name="${card.name}" data-list-id="${card.idList}" data-card-id="${card.id}">
  <div class="card-body">
    ${card.name}
  </div>
</div>`;

	$(`#${card.idList}`).find('.list-cards').append(htmlCard);
}
