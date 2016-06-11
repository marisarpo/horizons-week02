// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>');
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
  var listheader = $('<div class="list-header"><span class="list-title">' + this.getName() + '</span></div>');
  var listcards = $('<div class="list-cards"></div>');
  for (var i = 0; i < this.cards.length; i++)
    listcards.append(this.cards[i].render());
  var listfooter = $('<div class="list-footer">\
    <button class="list-button add-card" data-toggle="collapse" id="addCardForm'+this.id+'" data-list-id="'+this.id+'">Add a card...</button>\
    <div class="collapse" id="add-card_'+this.id+'"><div class="well add-card-form newCard">\
    <input type="text" class="form-control" id="add-card-text-'+this.id+'" placeholder="Card title">\
    <button type="button" class="btn btn-default save" data-data-data-list-id="'+this.id+'">Save</button><button type="button"class="btn btn-default">\
    <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span></button></div></div></div>');

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

