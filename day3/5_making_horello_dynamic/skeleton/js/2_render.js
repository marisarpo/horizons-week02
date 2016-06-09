// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body"><p>'+this.title+'</p></div>');

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
  var outterWrapper = $('<div></div>');
  var wrapper = $('<div class="list-container"></div>');
  var listwrapper = $('<div class="list"></div>');
  var listbody = $('<div class="list-header"><span class = "list-title">' + this.name + '</span></div>');
  var listbody2 = $('<div class="list-cards"></div>');
  var listfooter = $('<div class="list-footer"></div>');
  wrapper.append(listwrapper);
  listwrapper.append(listbody);
  listwrapper.append(listbody2);
  listwrapper.append(listfooter);
  listFooter.append($('<button class="add-card" addCardId="'+this.id+'">Add a card...</button>'));
  listFooter.append($('\
      <div class="collapse" id="addCardForm'+this.id+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
      <button type="button" class="btn btn-default" id="addCardBtn'+this.id+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span>\
      </button>\
      </div>\
      </div>\
    '));
  for (var i = 0; i < this.cards.length; i ++) {
    listbody2.append(this.cards[i].render());
  }
  outterWrapper.append(wrapper);
  return outterWrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var outterWrapper = $('<div></div>');
  var wrapper = $('<div class="board"></div>');
  for (var i = 0; i < this.lists.lenth; i ++) {
    wrapper.append(this.lists[i].render());
  }
  outterWrapper.append(wrapper);
  return outterWrapper.html();
}

