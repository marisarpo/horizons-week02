// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" id="'+ this.id + '"></div>');
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

  var wrapper = $("<div></div>");

  // build

  var listContainer = $("<div class='list-container'></div>");
  var list = $("<div class='list'></div>");

  var listHeader = $("<div class='list-header'></div>");
  var listCards = $("<div class='list-cards' id='" + this.id + "'></div>");
  var listFooter = $("<div class='list-footer'></div>");


  // insert step
  listContainer.append(list);  // list-container has list now
  list.append(listHeader);
  list.append(listCards);
  list.append(listFooter); //

  // build header
  var listTitle = $("<span class='list-title'></span>");
  listTitle.text(this.getName()); //puts this.getName() in text (in between carets) of the span
  listHeader.append(listTitle);


  //build cards(/body)
  var cardsHtml = _.map(this.cards, function(card){
    return card.render(); 
  }).join("\n");

  listCards.append($(cardsHtml)); //cast html for cards as jquery object 
  
  //build footer
  listFooter.append($('<button class="add-card btn" type="button" data-toggle= "collapse" data-target="#add-card-dropdown' + this.id + '">\
                Add a card...\
                </button>\
                <div class="collapse cardDrp" id="add-card-dropdown' + this.id + '" data-list-id="' + this.id + '">\
                    <div class="well">\
                        <form class="card-info">\
                            <input type="text" id="cardName' + this.id + '" class="form-control" placeholder="Card title">\
                            </input>\
                        </form>\
                        <button class="btn cardSave btn-default" data-list-id="' + this.id + '" type="button">\
                        Save\
                        </button>\
                        <button class="x btn btn-default">\
                            <div class="glyphicon glyphicon-remove" type="button">\
                            </div>\
                        </button>\
                    </div>\
                </div>'));

  //put listContainer in wrapper
  wrapper.append(listContainer);

  return wrapper.html()
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {

  var wrapper = $("<div></div>");
  var boardwrapper = $("<div class='board'></div>");

  boardwrapper.append(_.map(this.lists, function(list){
      return list.render()
    }).join("\n"));

  wrapper.append(boardwrapper);

  return wrapper.html();

}

