// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
	setEventListeners();
	render();
});

function createList(listName) {
  // YOUR CODE HERE
    $.ajax("https://api.Trello.com/1/lists", {
    method: "POST",
    data: {
      key: apiKey,
      token: apiToken,
      name: listName,
      idBoard: boardId,
      pos: 'bottom'
    },
    success: function (list) {
      console.log("Successfully created list with ID " + list.id + " for board " + boardId);
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error creating list for board " + boardId + ": " + JSON.stringify(err));
    }.bind(this)
  });
}

function createCard(name, listId) {
  // YOUR CODE HERE
}

function updateCard(title, desc, cardId) {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/cards/5939cc7c863da394585a9c54', {
    data: {
      key: "9921615c94748861405cc95f70abf813",
      token: "947e9bd0b9c796f4fa69e13acd2ea9d0f62a4baedbcadc9d0d95c5b99839ddf2",
      cards: 'all',
      lists: 'all'
    },
    succe
    success: function (data) {
      console.log("Successfully updated card " + cardId);
      render();
    }.bind(this),
    error: function (err) {
      console.error("Error updating title of card " + cardId + ": " + JSON.stringify(err));
    }.bind(this)
  });


}

function render() {
  // YOUR CODE HERE
  $.ajax('https://api.Trello.com/1/boards/5939cc7c863da394585a9c54', {
  	data: {
  		key: "9921615c94748861405cc95f70abf813",
  		token: "947e9bd0b9c796f4fa69e13acd2ea9d0f62a4baedbcadc9d0d95c5b99839ddf2",
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
  $('#boardAnchor').empty();
  $('#boardAnchor').append('<div id="5939cc7c863da394585a9c54" class="board"></div>')

  board.lists.forEach(function(list) {renderList(list)});
  board.cards.forEach(function(card) {renderCard(card)});
}

function renderList(list) {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var listContainer = $('<div class="list-container"></div>');
  var listWrapper = $('<div class="list" data-list-id="'+list.id+'" id="'+list.id+'"></div>');
  var listHeader = $('<div class="list-header"></div>');
  var listBody = $('<div class="list-cards"></div>');
  var listFooter = $('<div class="list-footer"></div>');

  wrapper.append(listContainer);
  listContainer.append(listWrapper);
  listWrapper.append(listHeader);
  listWrapper.append(listBody);
  listWrapper.append(listFooter);
  listHeader.append($('<span class="list-title"></span>').text(list.name));
  listFooter.append($('<button class="add-card" addCardId="'+list.id+'">Add a card...</button>'));
  listFooter.append($('<div class="collapse add-card-form-wrapper" id="addCardForm'+list.id+'">\
    <div class="well add-card-form">\
    <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+list.id+'">\
    <button type="button" class="btn btn-default add-card-save" id="addCardBtn'+list.id+'">Save</button>\
    <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+list.id+'"></span></button>\
    </div>\
    </div>\
    '));

  $('#' + list.idBoard).append(wrapper.html())
}

function renderCard(card) {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div id="'+card.id+'" class="card" data-card-desc="'+card.desc+'" data-card-name="'+card.name+'" data-list-id="'+card.idList+'" data-card-id="'+card.id+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if (card.desc) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  }
  var cardbody = $('<div class="card-body">'+card.name+'</div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(card.name);

  $('#' + card.idList).find('.list-cards').append(wrapper.html());
}
