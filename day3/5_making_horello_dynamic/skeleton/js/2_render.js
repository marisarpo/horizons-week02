// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body"></div>');

  wrapper.append(cardwrapper);
  if(this.desc) {
    cardwrapper.append(cardmore);
  }
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(this.title);
  if(this.desc) {
    cardbody.append($("<p></p>")).text(this.desc);
  }
  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var listcontainer = $('<div class=list-container></div>');
  var listwrapper = $('<div class="list"></div>');
  var listheader = $('<div class="list-header"></div>');
  var listtitle = $('<span class="list-title">' + this.name +'</span>');
  var listcards = $('<div class="list-cards"></div>');
  var listfooter = $('<div class="list-footer"><button class="list-button add-card"data-toggle="collapse" href="#addCard1">Add a card...</button><div class="collapse" id="addCard1"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default">Save</button><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button></div></div></div>');
  wrapper.append(listcontainer);
  listcontainer.append(listwrapper);
  listwrapper.append(listheader);
  listheader.append(listtitle);
  listwrapper.append(listcards);
  listwrapper.append(listfooter);
  
  if (this.cards.length === 0) return wrapper.html();

  for (var i = 0; i < this.cards.length; i++) {
    listcards.append(this.cards[i].render());
  }
  
  return wrapper.html();
  
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var boardwrapper = $('<div class="board"></div>');
  
  wrapper.append(boardwrapper);
  
  if(this.lists.length === 0) return wrapper.html();
  for (var i = 0; i < this.lists.length; i++) {
    boardwrapper.append(this.lists[i].render());
  }
  
  return wrapper.html();

}

