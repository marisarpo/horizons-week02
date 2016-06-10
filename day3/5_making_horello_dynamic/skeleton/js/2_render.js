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
  cardbody.append($("<p></p>")).text(this.title);

  return wrapper.html();
};

// Phase 2. List
// This function renders a list to HTML, representing the internal data
// and all of the cards it contains. It returns an HTML string
// representing the internal object.

                  // // instead of #addCard2 we do the thing like below, referncing something
                  // that was set below similarly

                                  // needs a unique ideainstead of "cardId2"

horello.List.prototype.render = function() {

  var cardsHtml = _.map(this.cards, function(card) {
    //maps through each of this.cards, applies a function to each card, which is rendering. renders every card
      return card.render();
    });

      cardsHtml = cardsHtml.join("\n"); // or ("\n")

  return '<div class="list-container">\
          <div class="list">\
              <div class="list-header">\
                  <span class="list-title">' + this.getName() + '</span>\
              </div>\
                <div class="list-cards">\
                  ' + cardsHtml + '\
                </div>\
              <div class="list-footer">\
                  <button class="list-button add-card"\
                          data-toggle="collapse"\
                          href="#addCard_' + this.getId() + '">Add a card...\
                  </button>\
                  <div class="collapse" id="addCard_' + this.getId() + '">\
                      <div class="well add-card-form">\
                          <input type="text" class="form-control"\
                                 placeholder="Card title" id="list_name_' + this.getId() + '">\
                          <button type="button" class="btn btn-default save" data-list-id=" ' + this.getId() + '">\
                              Save\
                          </button>\
                          <button type="button"\
                                  class="btn btn-default">\
                                  <span class="glyphicon glyphicon-remove" id="addCardCancelBtn ' + this.getId() + '"></span>\
                          </button>\
                      </div>\
                  </div>\
              </div>\
          </div>\
        </div>';

}

// horello.List.prototype.render = function() {
//   var wrapper = $('<div></div>');
//   var listcontainer = $('<div class="list-container"></div>');
//   var listwrapper = $('<div class="list" id="'+this.id+'"></div>');
//   var listheader = $('<div class="list-header"></div>')
//   var listfooter = $('<div class="list-footer"></div>');
//   var listbody = $('<div class="list-cards"></div>');

//   wrapper.append(listcontainer);
//   listcontainer.append(listwrapper);
//   listwrapper.append(listheader);
//   listwrapper.append(listbody);
//   listwrapper.append(listfooter);
//   listheader.append($('<span class="list-title"></span>'.text(this.name)));
//   listfooter.append($('<button class="add-card" addCardId="'+this.id+'">Add a card...</button>'));
//   listfooter.append($('\
//       <div class="collapse" id="addCardForm'+this.id+'">\
//       <div class="well add-card-form">\
//       <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
//       <button type="button" class="btn btn-default" id="addCardBtn'+this.id+'">\
//       Save\
//       </button>\
//       <button type="button" class="btn btn-default">\
//       <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span>\
//       </button>\
//       </div>\
//       </div>\
//     '));  
//   listbody.html(this.cards.reduce(function(prev, cur) {
//     return prev + cur.render();
//   }, ""));

//   return wrapper.html();
// }

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  //do same thing we did for cards, except iterate through lists, join them together, and attach them to board anchor
  var wrapper = $('<div></div>');

  //need this because of CSS and flex
  var boardwrapper = $("<div class='board'></div>")

  var lists = _.map(this.lists, function(list){ return list.render()}).join("\n")  

  boardwrapper.append(lists);

  wrapper.append(boardwrapper);

  return wrapper.html();

// boardwrapper.append(_.map(this.lists, function() {
//   return list.render()}).join("\n") )

  // var wrapper = $('<div id="board" class="board"></div>');
  // wrapper.html(this.lists.reduce(function(prev, cur) {
  //   return prev + cur.render();
  // }, ""));
  // return wrapper;    
}

