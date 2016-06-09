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

  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  var wrapper = $('<div></div>');
  var listContainer = $('<div class ="list-container"></div>');
  var list = $('<div class = "list"></div>');
  var listHeader = $('<div class = "list-header"></div>');
  var listTitle = $('<div class = "list-title">' + this.title + '</div>');
  var listCards = $('<div class = "list-cards"></div>'); 
  for (var i = 0; i < this.cards.length; i++) {
    listCards.append(this.cards[i].render());
  }

  var listFooter = $('<div class = "list-footer"></div>');
  var listContent = $('<button class="list-button add-card"'+
                          'data-toggle="collapse"' +
                        'href="#"' + this.id + '>Add a card...' +
                '</button>' +
                '<div class="collapse" id=' + this.id + '>' +
                    '<div class="well add-card-form">' +
                        '<input type="text" class="form-control"' +
                               'placeholder="Card title">' +
                        '<button type="button" class="btn btn-default">' +
                            'Save' +
                        '</button>'+
                        '<button type="button"' +
                                'class="btn btn-default"><span' +
                                'class="glyphicon glyphicon-remove"></span>' +
                        '</button>' +
                    '</div>' +
                '</div>')

  wrapper.append(listContainer);
  listContainer.append(list);
  list.append(listHeader);
  listHeader.append(listTitle);
  list.append(listCards);
  list.append(listFooter);
  listFooter.append(listContent);

  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var wrapper = $('<div></div>');
  var board = $('<div class = board></div>');
  for (var i = 0; i < this.lists.length; i++) {
    board.append(this.lists[i].render());
  }

  wrapper.append(board);

  return wrapper.html();

}

