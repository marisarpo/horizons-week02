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
  var listcontainering =$('<div class="list-container"></div>');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  var listwrapper = $('<div class="list" data-list-id="'+ this.id +'"></div>');
=======
  var listwrapper = $('<div class="list"></div>');
>>>>>>> master
=======
  var listwrapper = $('<div class="list"></div>');
>>>>>>> master
=======
  var listwrapper = $('<div class="list"></div>');
>>>>>>> master
  var listheader = $('<div class="list-header"></div>');
  var listtitler = $('<span class="list-title"></span>').text(this.name);
  var listcarder = $('<div class="list-cards"></div>');
  var listfooter = $('<div class="list-footer"></div>');

  wrapper.append(listcontainering);
  listcontainering.append(listwrapper);
  listwrapper.append(listheader);
  listwrapper.append(listcarder);
  listwrapper.append(listfooter);
  listheader.append(listtitler);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  listfooter.append($('<button class="add-card" addCardId="'+this.id+'">Add a card...</button>'));
=======
  listfooter.append($("<button class="add-card" addCardId="+this.id+">Add a card...</button>"));
>>>>>>> master
=======
  listfooter.append($("<button class="add-card" addCardId="+this.id+">Add a card...</button>"));
>>>>>>> master
=======
  listfooter.append($("<button class="add-card" addCardId="+this.id+">Add a card...</button>"));
>>>>>>> master
  listfooter.append($('\
      <div class="collapse" id="addCardForm'+this.id+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <button type="button" class="btn btn-default save" id="addCardBtn'+this.id+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default cancel"  addCardId="'+this.id+'">\
=======
=======
>>>>>>> master
=======
>>>>>>> master
      <button type="button" class="btn btn-default" id="addCardBtn'+this.id+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
=======
>>>>>>> master
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span>\
      </button>\
      </div>\
      </div>\
    '));

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
for(var i=0; i<this.cards.length; i++){
  listcarder.append(this.cards[i].render());
}
=======
>>>>>>> master
=======
>>>>>>> master
=======
>>>>>>> master

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var boardAnchor = $('<div id="boardAnchor"></div>');
  var board = $('<div id="board" class="board"></div>');

  boardAnchor.append(board);

  for(var i=0; i<this.lists.length; i++){
  board.append(this.lists[i].render());
}

return boardAnchor.html();
}

