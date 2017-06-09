// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + "/boards/" + boardId + "/lists",
  	method: "POST",
  	data: {
  		"key": apiKey,
  		"token": apiToken,
  		"name": listName,
  		"pos": 'bottom'
  	},
  	success: function(data) {
  		console.log("Added list", listName);
  		render();
  	}.bind(this),
  	error: function(error) {
  		console.log("Error adding list", listName);
  	}
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + "/cards/",
  	method: "POST",
  	data: {
  		"key": apiKey,
  		"token": apiToken,
  		"name": name,
  		"idList": listId,
  		"pos": "bottom"
  	},
  	success: function(data) {
  		console.log("Added card", name);
  		render();
  	}.bind(this),
  	error: function(error) {
  		console.log("Error adding card", name);
  	}
  });
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
  	url: apiUrl + "/cards/" + cardId,
  	method: "PUT",
  	data: {
  		"key": apiKey,
  		"token": apiToken,
  		"name": title,
  		"desc": desc
  	},
  	success: function(data) {
  		console.log("Updated card", data);
  		render();
  	}.bind(this),
  	error: function(error) {
  		console.log("Error updating card", error);
  	}
  })
}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939c22c803d672eddfbc7d6', {
	  data: {
	    key: "53f805b9774bf278550c14793c55b30d",
	    token: "641c5ac70fff182bbb5aef3552e1c1b953f0f6e844b1f42bb089bd7cb9f35495",
	    cards: 'all',
	    lists: 'all'
	  },
	  success: function(data) { 
	  	console.log(data);
	  	renderBoard(data);
	  }
	});
}

function renderBoard(board) {
  // YOUR CODE HERE
  $("#boardAnchor").empty();
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);

  board["lists"].forEach(function(list) {renderList(list)});
  board["cards"].forEach(function(card) {renderCard(card)});
}

function renderList(list) {
  // YOUR CODE HERE
  var listId = list["id"];
  var listIdBoard = list["idBoard"];
  var listName = list["name"];
  var listPos = list["pos"];

  var listObjectString = `
  <div class="list-container">
	  <div class="list" data-list-id="${list['id']}" id="${list['id']}">
	    <div class="list-header">
	      <span class="list-title">${listName}</span>
	    </div>
	    <div class="list-cards"></div>
	    <div class="list-footer">
	      <button class="add-card" addcardid="${list['id']}">Add a card...</button>
	      <div class="collapse add-card-form-wrapper" id="addCardForm${list['id']}">
	        <div class="well add-card-form">
	          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list['id']}" />
	          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list['id']}">Save</button>
	          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list['id']}"></span></button>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
	`;

	$("#"+boardId).append($(listObjectString));

}

function renderCard(card) {
  // YOUR CODE HERE
  var cardId = card["id"];
  var cardDesc = card["desc"];
  var cardName = card["name"];
  var listId = card["idList"];
  console.log(cardName);

  var cardObjectString = `
  <div id="${cardId}" class="card" data-card-desc="${cardDesc}" data-card-name="${cardName}" data-list-id="${listId}" data-card-id="${cardId}">
	  <div class="card-body">${cardName}</div>
	</div>
  `;

  $("#"+listId).find(".list-cards").append($(cardObjectString));
}
