// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+ this.getId() +'"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body"></div>');

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
  var list = $('<div class="list"></div>');
  var listheader = $('<div class="list-header"><span class="list-title">' + this.getName() + '</span></div>');
  var listcards = $('<div class="list-cards"></div>');
  var listfooter = $('<div class="list-footer"></div>');
  var listfootercontents = $('<button class="add-card" data-toggle="collapse" href="#addCard_' + this.getId() + '">Add a card...</button>\
                            <div class="collapse addCard" id="addCard_' + this.getId() + '" data-list-id="' + this.getId() + '">\
                            <div class="well add-card-form">\
                            <input type="text" class="form-control" placeholder="Card title" id="listName_'+ this.getId() +'">\
                            <button type="button" class="btn btn-default save" data-list-id="' + this.getId() +'">Save</button>\
                            <button type="button" class="btn btn-default addCardCancel" data-list-id="' + this.getId() +'"><span class="glyphicon glyphicon-remove"></span></button>\
                        </div>\
                    </div>\
                </div>');

  for(var i=0; i<this.cards.length; i++) {
    listcards.append(this.cards[i].render());
  };

  wrapper.append(listcontainer);
  listcontainer.append(list);
  list.append(listheader);
  list.append(listcards);
  list.append(listfooter);
  listfooter.append(listfootercontents);
  
  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var wrapper = $('<div></div');
  var boardwrapper = $('<div class="board"></div');
  var boardanchor = $('<div id="boardAnchor"></div>');

  for(var i=0; i<this.lists.length; i++) {
    boardanchor.append(this.lists[i].render());
  };

  wrapper.append(boardwrapper);
  boardwrapper.append(boardanchor);
  return wrapper.html();
}

