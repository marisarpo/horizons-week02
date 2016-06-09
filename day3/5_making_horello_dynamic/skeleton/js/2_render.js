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
  ///independent trial:
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>'); //two id tags mark the cards: list and card
  var cardmore = $('<span class="card-more"></span></span>');
  if(this.getDescription()){
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  };
  var cardbody = $('<div class="card-body"><p>'+this.title+'</p></div>');

wrapper.append(cardwrapper);
cardwrapper.append(cardmore);
cardmore.append(cardbody);

return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
 
///while setting id do not want hash but want when referencing 
horello.List.prototype.render = function() {
// independent trials
var wrapper= $('<div></div>');
var listWrapper= $('<div class="list-container"></div>');
var list = $('<div class="list"></div>');
var listheader= $('<div class="list-header"><span class="list-title">'+this.getName()+'</span></div>');
var cardswrapper= $('<div class="list-cards"></div>');
for(var i=0; i<this.cards.length; i++){
  cardswrapper.append(this.cards[i].render());
}
var footerwrapper= $('<div class="list-footer"><button class="add-card" addCardId="'+this.getId()+'">Add a card...</button></div>')
var footercontent = $('\
      <div class="collapse" id="addCardForm'+this.getId()+'">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
      <button type="button" class="btn btn-default" id="addCardBtn'+this.getId()+'">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.getId()+'"></span>\
      </button>\
      </div>\
      </div>\
    ');

wrapper.append(listWrapper);
listWrapper.append(list);
list.append(listheader);
list.append(cardswrapper);
list.append(footerwrapper);
footerwrapper.append(footercontent);

// var cardsHtml = _.map(this.cards,function(card){
//   return card.render;
// })

///white space: want to keep ierarchy, but ignoreed by browser

 return wrapper.html(); //refers to everything inside of empty div (wraps around everything else)
 }

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  var wrapper = $('<div></div>');
  var boardwrapper = $('<div class="board></div>');
  for(var i=0; i<this.lists.length; i++){
    boardwrapper.append(this.lists[i].render());
  }
  wrapper.append(boardwrapper);
  return wrapper.html();


}
