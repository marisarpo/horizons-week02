// PART 2. Render

///////////////////////////////////////////////////
//pass in data model itself to make interactive
//put into render, output html from render (data models to displayable content)



// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object. 

//iterating twidce through 2 arrays (Cads and lists)....board is big picture; lists inside board: each is rendered, with cards rendered inside
horello.Card.prototype.render = function() {  
  // build wrappers
  //wrappers to pass data from model to html
  //representin g html in java to spot out and replace
  // var wrapper = $('<div></div>');
  // var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>'); //represents one of the cards
  // var cardmore = $('<span class="card-more"></span></span>'); ///icon: put inside div card
  // if (this.getDescription()){
  //   cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'))
  // }
  // var cardbody = $('<div class="card-body"><p>'+this.title+'</p></div>'); //body put into card wrapper

  // wrapper.append(cardwrapper);
  // cardwrapper.append(cardmore);  ///puts innner inside of outer.."append into", elements inside of elements; appends in order appended to
  // cardwrapper.append(cardbody);
  // //cardbody.append($("<p></p>")).text(this.title); //will set text to match inner part

  // return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper=$('<div></div>'); //dive empty for placeholder
  var listWrapper = $('<div class="list-container"></div>');
  var list = $('<div class="list></div>');
  var listheader = $('div class="list-header"><span class="list-title">'+this.name+'<span></div>')
  var cardwrapper = $('<div class="list-cards"></div>')
for(var i=0; i<this.cards.length; i++){
  cardswrapper.append(this.cards[i].render()); //.render spits out cards into html; push all cards into card list based on cards list length
}

var footerwrapper= $(',div class="list-footer"></div>')
var footercontent= $('\
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
    ');

return wrapper.html //refers to everything inside of empty div (wraps around everything else)
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  //iterating through lists; call render on this.lists
  var wrapper = $('<div></div>')
  var boardwrapper = $('<div class="board"></div>')
  for (Var i =0; i<this.lists.length; i++){
    boardwrapper.append(this.lists[i].render()); //render to call html
  }
  wrapper.append(boardwrapper);
  return wrapper.html();

}