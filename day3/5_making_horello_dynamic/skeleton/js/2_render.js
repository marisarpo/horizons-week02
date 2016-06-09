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
horello.List.prototype.render = function() {
  // YOUR CODE HERE you need addition signs on each line 
    var wrapper = $('<div></div>');
    var listcon = $('<div class ="list-container"></div>');
    var list = $('<div class="list"></div>');
    var listhead = $('<div class="list-header"><span class="list-title">' + this.getName() + '</span></div>');
    var listcards = $('<div class="list-cards"></div>');
    for (var i = 0; i < this.cards.length; i++) {
      listcards.append(this.cards[i].render());
    }
    var listfoot = $('<div class="list-footer">\
      <button class="add-card" addCardId="' + this.getId() + '">Add a card...</button>\
      <div class="collapse" id="' + this.getId() + '">\
      <div class="well add-card-form"\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle' + this.getId() + '">\
      <button type="button" class="btn btn-default" id="addCardBtn' + this.getId() + '">Save</button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn' + this.getId() + '"></span>\
      </button>\
      </div>\
      </div></div>');
      wrapper.append(listcon);
      listcon.append(list);
      list.append(listhead);
      list.append(listcards);
      list.append(listfoot);

      return wrapper.html();
      




    // "\"" allows you do do multi line strings but delete spaces after
    // $('.classname:eq(0') to grab a particular elemet of a class, eq(number) is index from 0
// var cardsHtml = _.map(this.cards, function(card) {
//   return card.render();

// });
//   cardsHtml = cardsHtml.join("\n");

// return
//   '<div class="list-container">\
//         <div class="list"> \
//             <div class="list-header">\
//                 <span class="list-title">' + this.getName() + '</span>\
//             </div>\
//             <div class ="list=cards">\
//             '+ cardsHtml + '\
//             </div>\
//               <div class="list-footer">\
//                     <button class="add-card"\
//                             data-toggle="collapse"\
//                             href="#addCard_' + this.getId() + '"">Add a card...\
//                     </button>\
//                     <div class="collapse" id="#addCard_' + this.getId() + '">\
//                         <div class="well add-card-form">\
//                             <input type="text" class="form-control"\
//                                    placeholder="Card title" id="list_name' + this.getId() + ">\
//                             <button type="button"\
//                                     class="btn btn-default save" data-list-id ="'  + this.getId()+ '"" >Save\
//                             </button>\
//                             <button type="button"\
//                                     class="btn btn-default"><span\
//                                     class="glyphicon glyphicon-remove"></span>\
//                             </button>\
//                         </div>\
//                     </div>\
//                 </div>\
//             </div>\
//         </div>\
//     </div>';
//   }
}

// Phase 3. Board
// This function renders a Board, and all of the lists it contains, to
// HTML. It returns an HTML string representing the internal object.
horello.Board.prototype.render = function() {
  // YOUR CODE HERE
  return _.map(this.lists, function(list){ return list.render()});
}

