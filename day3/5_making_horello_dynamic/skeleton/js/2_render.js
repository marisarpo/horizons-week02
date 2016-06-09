// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if (this.getDescription()) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'))
  }
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

  var listcontainer = $('<div class="list-container"></div>');
  var listwrapper = $('<div class="list"></div>');
  var listheader = $('<div class="list-header"><span class="list-title">' + this.name + '</span></div>');
  var listcards = $('<span class="list-cards"></span>'); // where we have to add the repeating cards

  for(var i = 0; i < this.cards.length; i++) {
    listcards.append(this.cards[i].render());
  }

  var listfooter = $('<div class="list-footer"></div>');
  var footercontent = $('<button class="add-card" data-toggle="collapse" href="#' + this.id + '>Add a card...' +
                        '</button>' + 
                        '<div class="collapse" id=' + this.id + '>' +
                        '<div class="well add-card-form">' +
                        '<input type="text" class="form-control" placeholder="Card title">' +
                        '<button type="button" class="btn btn-default">Save' +
                        '</button>' +
                        '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span>' +
                        '</button>' +
                        '</div>' +
                        '</div>)');

  wrapper.append(listcontainer);
  listcontainer.append(listwrapper);
  listwrapper.append(listheader);
  listwrapper.append(listcards)
  listwrapper.append(listfooter)
  listfooter.append(footercontent)

  return wrapper.html();

  
};

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  
  var wrapper = $('<div></div>');
  var boardwrapper = $('<div class="board"></div>')

  for (var i = 0; i < this.lists.length; i++) {
    boardwrapper.append(this.lists[i].render());
  }

  wrapper.append(boardwrapper);
  return wrapper.html(); 
}

