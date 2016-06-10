// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" cardId="'+this.getId() +'" listId="' + this.listId+'"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body"></div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);

  cardbody.append($("<p></p>")).text(this.title);

  return wrapper.html();
}

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  var listwrapper = $('<div></div>')
  var listcontainer = $('<div class="list-container"></div>');
  var listin = $('<div class="list"></div>')
  var listheader = $('<div class="list-header"></div>');
  var listcards = $('<div class="list-cards"></div>');
  var listfooter = $('<div class="list-footer"></div>');

  var listfooterinner = $('<button class="list-button add-card"\
                        data-toggle="collapse"\
                        href="#addCard_' + this.getId() + '">Add a card...\
                        </button>')

  var listfooterinnertwo = $('<div class="collapse" id="addCard_' + this.getId() + '">\
                    <div class="well add-card-form">\
                        <input type="text" class="form-control"\
                               placeholder="Card title" id="addCardInput_' + this.getId() + '">\
                        <button type="button" class="btn btn-default save" data-list-id="' + this.getId()  +'" id="SAVED">\
                            Save\
                        </button>\
                        <button type="button"\
                                class="btn btn-default">\
                                <span class="glyphicon glyphicon-remove" data-toggle="collapse"\
                        href="#addCard_' + this.getId() + '"></span>\
                        </button>\
                    </div>\
                </div>');
  var listtitle = $('<span class="list-title">' + this.getName() + '</span>');
  listheader.append(listtitle);
  listfooter.append(listfooterinner);
  listfooter.append(listfooterinnertwo);
  for (var i = 0; i < this.cards.length; i++) {
    listcards.append(this.cards[i].render());
  }
  listin.append(listheader);
  listin.append(listcards);
  listin.append(listfooter);
  listcontainer.append(listin);
  listwrapper.append(listcontainer);
      var cards = []

  return listwrapper.html()
  // YOUR CODE HERE

}


// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var board = $('<div class="board"></div>');
  board.append(_.map(this.lists, function(list){return list.render()}).join(""));
  return board;
}

