// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-card-id="'+this.getId()+'" data-list-id="'+this.listId+'" ></div>');
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
  var listcontainer = $('<div class="list-container" data-list-id="'+this.id+'"></div>');
  var listwrapper = $('<div class="list" id="'+this.id+'"></div>');
  var listheader = $('<div class="list-header"></div>');
  var listtitle = $('<span class="list-title">'+this.getName()+'</span>');
  var listcards = $('<div class="list-cards"></div>');
  var listfooter = $('<div class="list-footer">'+
                '<button class="list-button add-card" id="addCard'+this.id+'" data-toggle="collapse" href="#collapse'+this.id+'">Add a card...</button>'+
                '<div class="collapse" id="collapse'+this.id+'">'+
                '<div class="well add-card-form">'+
                 '<input type="text" class="form-control" id="cardform'+this.id+'" placeholder="Card title">'+
                 '<button type="button" id="save'+this.id+'" class="btn btn-default" style="margin-right:5px">Save</button>'+
                 '<button type="button" id="cancel'+this.id+'" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button>'+
                 '</div></div></div>')
  for (var i in this.cards) {
    listcards.append(this.cards[i].render());
  }
  listheader.append(listtitle);
  listwrapper.append(listheader);
  listwrapper.append(listcards);
  listwrapper.append(listfooter);
  listcontainer.append(listwrapper);
  wrapper.append(listcontainer);


  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var boardwrapper = $('<div class="board" id="board"></div>');
  for (var i in this.lists) {
    boardwrapper.append(this.lists[i].render());
  }
  wrapper.append(boardwrapper);
  return wrapper.html();
}

