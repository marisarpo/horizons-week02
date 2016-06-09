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
  var wrapper=$('<div></div>');
  var listheader=$("<div class='list-header'> <span class='list-title'>"+ this.name+"</span></div>");
  var listcontainer=$('<div class="list-container"></div>')
  var listfooter=$('<div class="list-footer"></div>')
  var list=$('<div class="list" id="'+this.getId()+'"></div>')
  var listcards=$('<div class="list-cards">'+'<div class="card" data-toggle="modal"'+'data-target="#cardEdit">'+'<span class="card-more">'+'<span class="glyphicon glyphicon-align-left"></span>\
              </span>\
          <div class="card-body">'+this.getId()+'</div></div></div>')
  for (var i=0; i<this.cards.length;i++){
        listcards.append(this.cards[i].render())
      }
  wrapper.append(listcontainer)
  listcontainer.append(list)
  list.append(listheader)
  list.append(listcards)

  list.append(listfooter)
  listfooter.append($('<button class="add-card" addCardId="'+this.getId()+'">Add a card...</button>'))
  listfooter.append($('\
      <div class="collapse" id="addCardForm'+this.getId()+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
      <button type="button" class="btn btn-default" id="addCardBtn'+this.getId()+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.getId()+'"></span>\
      </button>\
      </div>\
      </div>\
    '));
  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper=$('<div></div>');
  var board=$('<div class="board"></div>')
  for (var i=0; i<horello.lists.length;i++){
    board.append(horello.lists[i].render())
  }
  wrapper.append(board)
  return wrapper.html();
}
