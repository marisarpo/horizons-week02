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
  // build wrappers
  var wrapper = $('<div></div>');
  var listcontainer = $('<div class="list-container"></div>');
  var listwrapper = $('<div class="list"></div>');
  var listhead = $('<div class="list-header">'+this.getName()+'</div>');
  var listbody = $('<div class="list-body"></div>');
  var listfooter = $('<div class="list-footer"><button class="add-card" data-toggle="collapse" '
     + 'href="#addCard3" listId="'+this.id+'">Add a card...</button><div class="collapse" id="footer'+ this.id + '">' + 
       '<div class="well add-card-form"><input type="text" class="form-control" id="save-card'+this.id+'" placeholder="Card title">' +
       '<button type="button" class="btn btn-default" id="save-btn'+this.id+'">Save</button><button type="button" class="btn btn-default">' +
       '<span class="glyphicon glyphicon-remove"></span></button></div></div></div>')

  this.cards.forEach(function(card){
    listbody.append(card.render());
  });

  wrapper.append(listcontainer);
  listcontainer.append(listwrapper);
  listwrapper.append(listhead);
  listwrapper.append(listbody);
  listwrapper.append(listfooter)

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var wrapper = $('<div></div>');
  var boardwrapper = $('<div class="board"></div>');
  
  this.lists.forEach(function(list){
    boardwrapper.append(list.render());
  });

  wrapper.append(boardwrapper);

  return wrapper.html();
}

