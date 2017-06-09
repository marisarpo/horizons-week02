// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
}

function createCard(name, listId) {
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
}

function render() {
	$.ajax('https://api.Trello.com/1/boards/5939c2276cf49ed60a5f74a2', {
	  data: {
	    key: "0dd362dcccd50f3fcc291a84d589f673",
	    token: "1f2aa0744bc4dc17440818a811a5cf7f5ea4f8dace342441cb2eec61b450ef2b",
	    cards: 'all',
	    lists: 'all'
	  },
	  success: function(data) { renderBoard(data) }
	});
}

function renderBoard(board) {
  $("#boardAnchor").empty();
  $("#boardAnchor").append(`<div id="${boardId}" class="board"></div>`);

  board["lists"].forEach(function(list) {
  	renderList(list)
  });

  board["cards"].forEach(function(card) {
  	renderCard(card));
  }); 	

}

function renderList(list) {
  var listID = list["id"];
  var listIdBoard = list["idBoard"]
  var listName = list["name"];
  var listPos = list["pos"];

  var listObjectString = `
		<div class="list-container">
		  <div class="list" data-list-id="${list["id"]}" id="${list["id"]}">
		    <div class="list-header">
		      <span class="list-title">test123</span>
		    </div>
		    <div class="list-cards"></div>
		    <div class="list-footer">
		      <button class="add-card" addcardid="${list["id"]}">Add a card...</button>
		      <div class="collapse add-card-form-wrapper" id="addCardForm${list["id"]}">
		        <div class="well add-card-form">
		          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle${list["id"]}" />
		          <button type="button" class="btn btn-default add-card-save" id="addCardBtn${list["id"]}">Save</button>
		          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn${list["id"]}"></span></button>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
`;

	$("#" + boardId ).append($(listObjectString));
}

function renderCard(card) {
  // YOUR CODE HERE
}
