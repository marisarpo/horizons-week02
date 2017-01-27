"use strict";
window.horello = window.horello || {};

///////////////////// RENDERERS /////////////////////

horello.Board.prototype.render = function() {
  var wrapper = $('<div id="board" class="board"></div>');
  wrapper.html(this.lists.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper;
},

horello.List.prototype.render = function() {
  // Build wrappers
  var wrapper = $('<div></div>');
  var listContainer = $('<div class="list-container"></div>');
  var listWrapper = $('<div class="list" id="'+this.id+'"></div>');
  var listHeader = $('<div class="list-header"></div>');
  var listBody = $('<div class="list-cards"></div>');
  var listFooter = $('<div class="list-footer"></div>');

  wrapper.append(listContainer);
  listContainer.append(listWrapper);
  listWrapper.append(listHeader);
  listWrapper.append(listBody);
  listWrapper.append(listFooter);
  listHeader.append($('<span class="list-title"></span>').text(this.name));
  listFooter.append($('<button class="add-card" addCardId="'+this.id+'">Add a card...</button>'));
  listFooter.append($('\
  <div class="collapse" id="addCardForm'+this.id+'">\
    <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle'+this.id+'">\
      <button type="button" class="btn btn-default" id="addCardBtn'+this.id+'">Save</button>\
      <button type="button" class="btn btn-default">\
        <span class="glyphicon glyphicon-remove" id="addCardCancelBtn'+this.id+'"></span>\
      </button>\
    </div>\
  </div>\
  '));

  // Build cards in the body
  listBody.html(this.cards.reduce(function(prev, cur) {
    return prev + cur.render();
  }, ""));
  return wrapper.html();
};

horello.Card.prototype.render = function() {
  // build wrappers
  var wrapper = $('<div></div>');
  var cardwrapper = $('<div class="card" data-list-id="'+this.listId+'" data-card-id="'+this.id+'"></div>');
  var cardmore = $('<span class="card-more"></span>');
  if (this.description) {
    cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
  }
  var cardbody = $('<div class="card-body">'+this.title+'</div>');

  wrapper.append(cardwrapper);
  cardwrapper.append(cardmore);
  cardwrapper.append(cardbody);
  cardbody.append($("<p></p>")).text(this.title);

  return wrapper.html();
};


///////////////////// GET CARD AND LIST /////////////////////

horello.List.prototype.getCard= function(cardId) {
  // TODO: WHAT DOESTHIS DO???
  // ANY WAY OF IMPROVING??
  var card = this.cards.filter(function(c) {
    return (c.id == cardId);
  });
  if (card.length > 0) {
    return card[0];
  }  return null;
}

horello.Board.prototype.getList = function(listId) {
  // TODO: WHAT DOESTHIS DO???
  // ANY WAY OF IMPROVING??
  return this.lists.find(function(c) {
    return (c.id == listId);
  });
}