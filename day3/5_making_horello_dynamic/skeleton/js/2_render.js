// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-card-id="'+this.getId()+'" data-list-id="'+this.listId+'"></div>');
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
  var wrapper = $('<div></div>');
  var lcwrapper = $('<div class="list-container"></div>');
  var listwrapper = $('<div class="list" id="'+this.getId()+'"></div>');
  var listheader = $('<div class="list-header"></div>');
  var listtitle = $('<span class="list-title">' + this.getName() + '</span>');
  var listcards = $('<div class="list-cards"></div>')
  var listfooter = $('<div class="list-footer"><button class="list-button add-card" data-toggle="collapse" href="#collapse' + this.getId() + '" id="'+this.getId()+'">Add a card...</button><div class="collapse" id=collapse' + this.getId() + '><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title" id="addCardTitle' + this.getId() + '"><button type="button" class="btn btn-default" id="saveCardBtn' + this.getId() + '">Save</button><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn' + this.getId() + '"></span></button></div></div></div>')

  wrapper.append(lcwrapper);
  lcwrapper.append(listwrapper);
  listwrapper.append(listheader);
  listheader.append(listtitle);
  listwrapper.append(listcards);
  for (var i in this.cards) {
    listcards.append(this.cards[i].render());
  }
  listwrapper.append(listfooter);

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var wrapper = $('<div></div');
  var boardwrapper = $('<div class="board" id="board"></div>')

  wrapper.append(boardwrapper);
  for (var i in this.lists) {
    boardwrapper.append(this.lists[i].render());
  }

  return wrapper.html();
}
