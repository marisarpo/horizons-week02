// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" id="'+this.getId().trim()+'"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body"></div>');

  wrapper.append(cardwrapper);
  if (this.desc) {
    cardwrapper.append(cardmore);
  }
  cardwrapper.append(cardbody);
  if (this.title) {
    cardbody.append($("<p></p>")).text(this.title);
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
  var listcontainerwrapper = $('<div class="list-container"></div')
  var listwrapper = $('<div class="list"></div>');
  var listheader = $('<div class="list-header"><span class="list-title">' + this.name +'</span></div>');
  var listcards = $('<div class="list-cards" list-id="'+this.getId().trim()+'"></div>');
  var listfooter = $(
    '<div class="list-footer">' + 
      '<button class="list-button add-card" data-toggle="collapse" id="'+this.getId().trim()+'">Add a card...</button>' + 
      '<div class="collapse" collapse-id="'+this.getId().trim()+'">' +
        '<div class="well add-card-form">' +
          '<input type="text" class="form-control" placeholder="Card title" input-id="'+this.getId().trim()+'">' + 
          '<button type="button" class="btn btn-default save" data-list-id="'+this.getId().trim()+'">Save</button>' + 
          '<button type="button"class="btn btn-default">' +
            '<span class="glyphicon glyphicon-remove"></span>' + 
          '</button>' + 
        '</div>' + 
      '</div>' + 
    '</div>');

  wrapper.append(listcontainerwrapper);
  listcontainerwrapper.append(listwrapper);
  listwrapper.append(listheader);
  listheader.append(listcards);
  listwrapper.append(listfooter);
  if (this.cards.length === 0) {
    return wrapper.html();
  }
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
  var board = $('<div class="board"></div>');
  if (this.lists.length === 0) {
    return board.html();
  }
  for(var i = 0; i < this.lists.length; i++) {
    board.append(this.lists[i].render());
  }
  return board.html();
}

