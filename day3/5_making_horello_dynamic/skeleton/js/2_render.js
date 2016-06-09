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
  var wrapper = $('<div></div>');
  var listwrapper = $('<div class="list-container"></div>');
  var list = $('<div class="list"></div>');
  var listheader = $('<div class="list-header"><span class="list-title">' + this.title + '</span></div>');
  var listcards = $('<div class="list-cards"></div>');
  for (var i = 0; i < this.cards.length; i++)
    listcards.append(this.cards[i].render());
  var listfooter = $('<div class="list-footer"><button class="list-button add-card"><div class="collapse"><div class="well add-card-form"></div><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default">Save</button><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button></div></button></div>');

  wrapper.append(listwrapper);
  listwrapper.append(list);
  list.append(listheader);
  list.append(listcards);
  list.append(listfooter);

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var boardwrapper = $('<div class="board"></div>');
  for (var j = 0; j < this.lists.length; j++) {
    console.log(this.lists[j]);
    boardwrapper.append(this.lists[j].render());
  }

  wrapper.append(boardwrapper);

  return wrapper.html();
}

