// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {

  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.getId()+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if (this.getDescription()) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
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
    // Build wrappers
  var wrapper = $('<div></div>');

  var listContainer = $('<div class="list-container"></div>');
  var listWrapper = $('<div class="list" id="'+this.getId()+'"></div>');
  var listHeader = $('<div class="list-header"></div>');
  var listBody = $('<div class="list-cards"></div>');
  var listFooter = $('<div class="list-footer"></div>');


  for (var i=0; i<this.cards.length; i++) {
    listBody.append(this.cards[i].render()
      )};

  wrapper.append(listContainer);
  listContainer.append(listWrapper);
  listWrapper.append(listHeader);
  listWrapper.append(listBody);
  listWrapper.append(listFooter);
  listHeader.append($('<span class="list-title"></span>').text(this.name));
  listFooter.append($('<button class="add-card" addCardId="'+this.getId()+'">Add a card...</button>'));
  listFooter.append($('\
      <div class="collapse" id="addCardForm'+this.getId()+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.getId()+'">\
      <button type="button" class="btn btn-default save" addCardBtn="'+this.getId()+'">\
      Save\
      </button>\
     <button type="button" class="btn btn-default cancel" addCardCancelBtn="'+this.getId()+'">\
      <span class="glyphicon glyphicon-remove" ></span>\
      </button>\
      </div>\
      </div>\
    '));

  return wrapper.html();

};

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var wrapper = $('<div></div>')
  var boardWrapper = $('<div id="board" class="board"></div>');
  for (var i=0; i<this.lists.length; i++) {
    boardWrapper.append(this.lists[i].render());
  }
  wrapper.append(boardWrapper)
  return wrapper;
}


