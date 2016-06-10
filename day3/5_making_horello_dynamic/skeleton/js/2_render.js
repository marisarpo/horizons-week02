// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-card-id="'+this.getId()+'" data-list-id="'+this.listId+'"></div>');
  var cardmore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
  var cardbody = $('<div class="card-body"></div>');
//console.log(this.title)
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
  var listcontainer=$('<div class="list-container"></div>')
  var list=$('<div class="list"></div>')
  var listheader=$("<div class='list-header'>  <span class='list-title'>"+ this.name+"</span></div>");
  var listcards=$('<div class="list-cards"></div>')
  var listfooter=$('<div class="list-footer"></div>')

var addlistcontainer=$('<div class="add-list-container"></div>')
  listcontainer.append(addlistcontainer)
  wrapper.append(listcontainer)
  listcontainer.append(list)
  list.append(listheader)
  list.append(listcards)
  list.append(listfooter)
  listfooter.append($('<button class="add-card" data-toggle="collapse" href="#addCard2" data-list-id='+this.getId()+'>Add a card...</button>\
        <div class="collapse" id="list-dropdown-' + this.getId() + '"><div class="well add-card-form">\
          <input type="text" class="form-control" id="text'+this.getId()+'"\
                 placeholder="Card title" >\
          <button type="button" class="btn btn-default save" data-list-id=' + this.getId() + '>\
              Save\
          </button>\
          <button type="button"\
                  class="btn btn-default cancel" data-list-id='+this.getId()+'><span\
                  class="glyphicon glyphicon-remove"></span>\
          </button>\
      </div></div>'));
      for (var i=0; i<this.cards.length;i++){
            listcards.append(this.cards[i].render())
          }
  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper=$('<div></div>');
  var board=$('<div class="board"></div>')
  for (var i=0; i<this.lists.length;i++){
    board.append(this.lists[i].render())
  }
  wrapper.append(board)
  return wrapper.html();
}
