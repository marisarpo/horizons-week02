// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>');
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


  var cardsHtml = _.map(this.cards, function(card){
                    return card.render();
                  });

      cardsHtml = cardsHtml.join("\n");


 return '<div class="list-container">\
    <div class="list">\
        <div class="list-header">\
            <span class="list-title">' + this.getName() + '</span>\
        </div>\
            <div class="list-cards">\
            ' +  cardsHtml  +  '\
            </div>\
            <div class="list-footer">\
                <button class="list-button add-card"\
                        data-toggle="collapse"\
                        href="#addCard_' + this.getId() + '">Add a card...\
                </button>\
                <div class="collapse" id="addCard_' + this.getId() + '">\
                    <div class="well add-card-form">\
                        <input type="text" class="form-control"\
                               placeholder="Card title" id="list_name_'  + this.getId() +'">\
                        <button type="button" class="btn btn-default save" data-list-id="' + this.getId()  +'">\
                            Save\
                        </button>\
                        <button type="button"\
                                class="btn btn-default">\
                                <span class="glyphicon glyphicon-remove"></span>\
                        </button>\
                    </div>\
                </div>\
            </div>\
       </div>\
  </div>';


}
// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  var wrapper = $('<div id="board" class="board"></div>');
  wrapper.html(this.lists.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper;
}
