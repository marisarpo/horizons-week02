
// PART 2. Render
// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if(this.getDescription()){
    cardmore.append('<span class="glyphicon glyphicon-align-left"></span>')
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
  // YOUR CODE HERE you need addition signs on each line 
    var wrapper = $('<div></div>');
    var listcon = $('<div class ="list-container"></div>');
    var list = $('<div class="list" id="'+this.id+'"></div>');
    var listhead = $('<div class="list-header"><span class="list-title"></span>' + this.getName() + '</div>');
    var listcards = $('<div class="list-cards"></div>');
    for (var i = 0; i < this.cards.length; i++) {
      listcards.append(this.cards[i].render());
    }
  var listFooter = $('<div class="list-footer"></div>');
  listFooter.append($('<button class="add-card" addCardId="'+this.id+'">Add a card...</button>'));
  listFooter.append($('\
      <div class="collapse" id="addCardForm'+this.id+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
      <button type="button" class="btn btn-default save-btn" id="addCardBtn'+this.id+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span>\
      </button>\
      </div>\
      </div>\
    '));
      wrapper.append(listcon);
      listcon.append(list);
      list.append(listhead);
      list.append(listcards);
      list.append(listFooter);

        listcards.html(this.cards.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));


      return wrapper.html();
      
    // "\"" allows you do do multi line strings but delete spaces after
   
}
// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
//   return _.map(this.lists, function(list){ return list.render()});
// }
  var wrapper = $('<div id="board" class="board"></div>');
  wrapper.html(this.lists.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper;    
}