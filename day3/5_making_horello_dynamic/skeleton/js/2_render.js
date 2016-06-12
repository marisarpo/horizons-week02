// PART 2. Render

// Phase 1. Card [EXAMPLE]
// This function renders a card to HTML, representing the internal data.
// It returns an HTML string representing the internal object.
horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card"></div>');
  var cardexpandwithdescription = 
  $('<button type="button" class="desc hasDesc" id="expandButton'+this.getId()+'" data-id="'+this.getId()+'" display="'+this.getShowGlyph()+'">\
  			<span class="desc glyphicon glyphicon-align-left" data-id="'+this.getId()+'">\
  			</span>\
  		</button>\
  		<div class="collapse desc" data-id="'+this.getId()+'">'+this.getDescription()+'\
  		</div>');
  var cardmore = $('<div class="card-more"></div>');
	var cardedit = $('<type="button" class="edit" data-toggle="modal" data-target="#editCard">');
  var outercardbody = $('<div class="card-body" data-id="'+this.getId()+'" data-list-id="'+this.getListId()+'"></div>')
  var cardbody = $('<div class="titleText" data-id="'+this.getId()+'" data-list-id="'+this.getListId()+'">'+this.title+'</div>');
  var cardremove = $('<button type="button" class="close cardClose"><span class="glyphicon glyphicon-remove" data-list-id="'+this.getListId()+'" data-id="'+this.getId()+'"></span></button');

  wrapper.append(cardwrapper);
  cardmore.append(cardexpandwithdescription);
  outercardbody.append(cardmore);
  cardwrapper.append(cardedit);
  
  outercardbody.append(cardremove);
  outercardbody.append(cardbody);
  
  cardwrapper.append(outercardbody);

  cardbody.append($("<p></p>")).text(this.title);



  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.
horello.List.prototype.render = function() {
  // YOUR CODE HERE

  var wrapper = $('<div></div>');
  var listcontainerwrapper = $('<div class="list-container"></div>');
  var listwrapper = $('<div class="list"></div>');
  var listheader = $('<div class="list-header"></div>');
  var listtitle = $('<div class="list-title" data-id="'+this.getId()+'"></div>')
  var listremove = $('<button type="button" class="close listClose" data-id="'+this.getId()+'"><span data-id="'+this.getId()+'">&times;</span></button');
  var listtitlechanger = $('<input type="text" class="titleChanger" data-id="'+this.getId()+'" value="'+this.getName()+'"disabled></input>');
  var listcards = $('<div class="list-cards"></div>');
  var listfooter = 
  $('<div class="list-footer">\
  		<button class="list-button add-card" data-id="'+this.getId()+'">Add a card...</button>\
  		<div class="collapse addCard" data-id="'+this.getId()+'">\
  			<div class="well add-card-form">\
  				<input type="text" placeholder="Card title" class="form-control addCardText" data-id="'+this.getId()+'">\
  				<button type="button" class="btn btn-default addCardSave" data-id="'+this.getId()+'">Save</button>\
	  			<button type="button" class="btn btn-default addCardCancel" data-id="'+this.getId()+'">\
	  				<span class="glyphicon glyphicon-remove"></span>\
	  			</button>\
	  		</div>\
  		</div>\
  	</div>');


  wrapper.append(listcontainerwrapper);
  listcontainerwrapper.append(listwrapper);
  listheader.append(listremove);
  listtitle.append(listtitlechanger)
  listheader.append(listtitle);
  listwrapper.append(listheader);


   //Add cards to list cards
  for(var i=1; i<=this.cards.length; i++){
    listcards.append(this.cards[this.cards.length-i].render())
  }

  listwrapper.append(listcards);

  listwrapper.append(listfooter);


  return wrapper.html();
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE

  var wrapper = $("<div></div>");
  var boardwrapper = $('<div class="board"></div>');


  for(var i=1;i<=this.lists.length;i++){
  	boardwrapper.append(this.lists[this.lists.length-i].render());
  	
  };

  
  wrapper.append(boardwrapper);
  
  return wrapper.html();


}

