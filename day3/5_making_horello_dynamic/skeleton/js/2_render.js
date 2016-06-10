// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  var cardbody = $('<div class="card-body"><p>'+this.title+'</p></div>');
  var cardimg = $('<span class="glyphicon glyphicon-align-left"></span>');
  if(this.desc) {
    cardmore.append(cardimg);
  }

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);

  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var listcontainer = $('<div class="list-container"></div>')
  var listwrapper = $('<div class="list" data-list-id="'+this.id+'"></div>');
  var listheader = $('<div class="list-header"><span class="list-title">'+this.name+'</span></div>');
  var listcards = $('<div class="list-cards"></div>');

  for (var i = 0; i < this.cards.length; i ++) {
    listcards.append(this.cards[i].render());
  }

  var listfooter = $('<div class="list-footer"></div>');
  var footercontent = $('<button class="list-button add-card" data-toggle="collapse" data-list-id="' + this.id + '" href="#'+this.id+'">Add a card...</button><div class="collapse" id="'+this.id+
                    '"><div class="well add-card-form">'+
                        '<input type="text" class="form-control" placeholder="Card title" id="addCardText'+this.id+'">'+
                        '<button type="button" class="btn btn-default save" id="save'+this.id+'" data-list-id="'+this.id+'">Save</button>'+
                        '<button type="button" class="btn btn-default cancel" id="cancel'+this.id +'" data-list-id="'+this.id+'"><span class="glyphicon glyphicon-remove"></span></button></div></div>');
  wrapper.append(listcontainer);
  listcontainer.append(listwrapper);
  listwrapper.append(listheader);
  listwrapper.append(listcards);
  listwrapper.append(listfooter);
  listfooter.append(footercontent);

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>')
  var boardwrapper = $('<div class="board"></div>');

  for (var i = 0; i < this.lists.length; i ++) {
    boardwrapper.append(this.lists[i].render());
  }

  wrapper.append(boardwrapper);

  return wrapper.html(); 
}

