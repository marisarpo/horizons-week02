// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body">'+this.title+'</div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(this.title);

  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  // YOUR CODE HERE
  var container = $('<div class="container"></div>');
  var list = $('<div class="list" id="' + this.getId() + '"></div>');

  // list header
  var listHeader = $('<div class="list-header"></div>');
  var listTitle = $('<span class="list-title">' + this.getName() + '</span>')

  console.log('listId from render: ' + this.getId());

  // list cards
  var listCards = $('<div class="list-cards"></div>');  
  // list footer
  var listFooter = $('<div class="list-footer"></div>');
  var addCardButton = $('<button class="add-card">Add a card...</button>');
  
  var footerCollapse = $('<div class="collapse"></div>');

  var footerWell = $('<div class="well add-card-form"></div>');
  var footerInput = $('<input type="text" class="form-control" placeholder="Card Title"></input>');
  var footerSaveButton = $('<button type="button" class="btn btn-default">Save</button>');
  
  var footerXButton = $('<button type="button" class="btn btn-default"></button>');
  var footerXIcon = $('<span class="glyphicon glyphicon-remove"></span>');
  

  


  // wrap all
  listHeader.append(listTitle);

  listCards.append(this.cards.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));

  listFooter.append(addCardButton);

  footerXButton.append(footerXIcon);

  footerWell.append(footerInput);
  footerWell.append(footerSaveButton);
  footerWell.append(footerXButton);

  footerCollapse.append(footerWell);
  listFooter.append(footerCollapse);

  list.append(listHeader);
  list.append(listCards);
  list.append(listFooter);

  container.append(list);

  return container.html();

}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var board = $('<div id="board" class="board"></div>');

  board.html(this.lists.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));

  return board.html(); 
}

