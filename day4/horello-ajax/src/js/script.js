// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.
var apiKey = "0a0fe8605fe16af4beee70c93ac91678";
var apiToken = "eabbcebffdb7197c43763722d372b9ef57a029cf1ff3afe4b2b3ae519d3b7f7e";
var apiUrl = "https://api.trello.com/1";
var boardId = "5939f60feaa3459fe865c162";

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  // YOUR CODE HERE
  $.ajax({
  	url:'https://api.Trello.com/1/lists',
  	method:'POST',
  	data: {
  		key:apiKey,
  		token:apiToken,
  		name:listName,
  		idBoard:boardId
  	},
  	success:function(data){
        render()
  	}.bind(this)
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
    $.ajax({
  	url:'https://api.Trello.com/1/cards/',
  	method:'POST',
  	data: {
  		key:apiKey,
  		token:apiToken,
  		name:name,
  		idList:listId
  	},
  	success:function(data){
        render()
  	}.bind(this)
  })
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax({
  	url:'https://api.Trello.com/1/cards/'+cardId,
  	method:'PUT',
  	data: {
  		key:apiKey,
  		token:apiToken,
  		name:title,
  		desc:desc
  	},
  	success:function(data){
        render()
  	}.bind(this)

  })
}

function render() {
  // YOUR CODE HERE
	$.ajax('https://api.Trello.com/1/boards/5939f60feaa3459fe865c162', {
	  data: {
	    key: "0a0fe8605fe16af4beee70c93ac91678",
	    token: "eabbcebffdb7197c43763722d372b9ef57a029cf1ff3afe4b2b3ae519d3b7f7e",
	    cards: 'all',
	    lists: 'all'
	  },
	  success: function(data) { renderBoard(data)}
	});

}

function renderBoard(board) {
  // YOUR CODE HERE
  // console.log(board);
  $('#boardAnchor').empty();
  var newItem =  `<div id="${boardId}" class="board"></div>`
  
  $('#boardAnchor').append(newItem);

  for(var i = 0; i<board.lists.length;i++){
     renderList(board.lists[i]);
  }
  for(var i = 0; i<board.cards.length;i++){
     renderCard(board.cards[i]);
  }
}

function renderList(list) {
  // YOUR CODE HERE
  var newItem = `<div class="list-container">
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
</div>`;
  // console.log(newItem);
  $('#'+boardId).append(newItem);
}

function renderCard(card) {
  // YOUR CODE HERE
  var newItem =`<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
	  <div class="card-body">
	    ${card.name}
	  </div>
	</div>`

  $('#'+ card.idList+ ' .list-cards').append(newItem);
}
