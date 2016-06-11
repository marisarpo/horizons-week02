"use strict";

window.horello = window.horello || {};

horello.generateId = function() {
  var chunk = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};

// CARD

horello.Card = function(title, desc, listId, id) {
  this.id-id;
  this.listId = listId;
  this.title = title;
  this.desc = desc;
};

horello.Card.prototype = {
  getId: function() {
    return this.id;
  },

  getTitle: function() {
    return this.title;
  },

  setTitle: function(titleStr) {
    this.title = titleStr;
  },

  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
    this.desc = desc;
  },

  render: function() {
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
  }
};

////RETURNS A CARD OBJECT
//takes one of trello's responses and returns a card
horello.Card.fromJSON = function(data) {
  // PHASE 1 code here
  var card = horello.Card(data.id, data.name, data.desc, data.idList); /// maatch necessary data imports from horello fles, 
  //look into card data for proper identification, similar list call to card

};


// LIST

horello.List = function(id, name) {
  this.id = id;
  this.name = name;
  this.cards = [];
};

horello.List.prototype = {
  getId: function() {
    return this.id;
  },

  getName: function() {
    return this.name;
  },

  setName: function(name) {
    this.name = name;
  },

  addCard: function(name, desc) {
    var card = new horello.Card(name, desc, this.getId());
    this.cards.push(card);
    return card.getId();
  },

  getCard: function(cardId) {
    var card = this.cards.filter(function(c) {
      return (c.getId() == cardId);
    });
    if (card.length > 0) {
      return card[0];
    }
    return null;
  },

  render: function() {
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
      <button type="button" class="btn btn-default" id="addCardBtn'+this.id+'">\
      Save\
      </button>\
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
  }
};

horello.List.fromJSON = function(data) {
  // PHASE 1 code here
    var card = new horello.Card(data.id)
};


// BOARD ///dont need to get board in this case because only one board, not pulling from other places

horello.Board = function () {
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(listName) {
    var list = new horello.List(listName);
    this.lists.push(list);
    return list.getId();
  },

  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },

  render: function() {
    var wrapper = $('<div id="board" class="board"></div>');
    wrapper.html(this.lists.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));
    return wrapper;
  }
};

// var sites = [
// "http://www.facebook.com",
// "http://pinterest.com",
// "http://www.reddit.com"]

// function ajaxCall(){
//   for(var i=0; i<sites.length; i++){
//     var url = sites[i++]
//   $.ajax(url, {
//     success: function(){
//       console.log("AJAX call" + i ":I just loaded" + url);
//     }
//   })
// }
// }

horello.loadData = function(board_id){
 // var listOfLists;
  //part 1 ajax call
 var data = $.ajax(horello.apiUrl +'/boards/' + board_id + '/lists',{ //returns data structure, not return values inside, not applicable yet
  //usng function for side effects not return values... care about responses, NOT the data inside
    data: {
      key: horello.apiKey,
      token: horello.apiToken,
      method: "GET"
    },
   // method: "GET", //data and method are each separate parameters
    success: function(response){
      //part 2 success
     console.log(JSON.stringify(response));
      var x = $.map(response, function(el){
      return el;
     })
     console.log(x)
      //board.render();
       //par 3 = response call
  //var real = _.map(x, horello.List.fromJSON);
  //console.log(real)
 // console.log(real)
  ///need to get cards for list in here ater loaded, last step to render the data
  //can render the board here to rerender each time we have a card but will nonetheless render the full boaard
    },
    error: function(err){
    //console.error(JSON.stringify(err));
    }
  }) //can look up in horello api docs, shoulf load list data 
}
/////////////////////////ORDER: 1,3,2//////////////////////////////
///ajax= asyncronous


//don't care about return values, care about side efffects (printing messages, popping alerts, getting data but not returning data,
//initializing objects)
///getters return things, setters are called for side efffects( change something)