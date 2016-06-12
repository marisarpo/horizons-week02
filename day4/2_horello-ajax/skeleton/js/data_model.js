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
  this.id = id;
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
    $.ajax("https://api.trello.com/1/cards/" + this.getId(), {
      method: "PUT",
      data: {
        key:"021d5093185ea965dd6a50153429b08c",
        token:"236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d",
        name: titleStr,
      }, success: function(response) {
        this.title = titleStr;
        horello.mount(board);
      }.bind(this)
  })
},


  getDescription: function() {
    return this.desc;
  },

  setDescription: function(desc) {
$.ajax("https://api.trello.com/1/cards/" + this.getId(), {
      method: "PUT",
      data: {
        key:"021d5093185ea965dd6a50153429b08c",
        token:"236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d",
        desc: desc
      }, success: function(response) {
        this.desc = desc;
        horello.mount(board);
      }.bind(this)
    })
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

// returns a card object
horello.Card.fromJSON = function(data) {
  var description = data.desc;
  var title = data.name;
  var id = data.id
  var listId = data.listId
  return new horello.Card(data.name, data.desc, data.idList, data.id)
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

  getData: function() {
    $.ajax("https://api.trello.com/1/lists/"+this.getId()+"/cards", {
      method: "GET", 
      data: {
        key: "021d5093185ea965dd6a50153429b08c",
        token: "236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d"
      },
      success: function(response) {
        response.forEach(function(card) {
          var newCard = horello.Card.fromJSON(card);
          board.getList(newCard.listId).cards.push(newCard);
          horello.mount(board);
        })
      },
      error: function(response) {
        console.error(response);
      }
    });
  },

  setName: function(name) {
    this.name = name;
  },

  addCard: function(name, desc) {
    $.ajax({ 
      method: "POST",
      url: "https://api.trello.com/1/lists/"+ this.getId() + "/cards",
      data: {
        key:"021d5093185ea965dd6a50153429b08c",
        token:"236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d",
        name: name, 
        desc: desc
      },
      success: function(response) {
        var card = new horello.Card(name, desc, this.getId());
        card.id = response.id;
        this.cards.push(card);
        horello.mount(board);
      }.bind(this),
      error: function(error) {
        console.error(error);
      }
    });



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
  return new horello.List(data.id, data.name)
};


// BOARD

horello.Board = function () {
  this.lists = [];
};

horello.Board.prototype = {
  addList: function(listName) {
    $.ajax({ method: "POST",
      url: "https://api.trello.com/1/boards/qQCSeDjt/lists",
      data: {
        key:"021d5093185ea965dd6a50153429b08c",
        token:"236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d",
        name: "Extra stuff",
        pos: "bottom",
      },
      success: function(response) { 
        var newList = new horello.List(response.id, listName);
        this.lists.push(newList);
        horello.mount(board);
      }.bind(this),
      error: function(msg) {
        console.log(error)
      } 
    });
  },
  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },
  getData: function() {
    $.ajax("https://api.trello.com/1/boards/qQCSeDjt/lists",{
      method:"GET",
      data:{
        key:"021d5093185ea965dd6a50153429b08c",
        token:"236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d"
      },
      success:function(response){
        response.forEach(function(list){
          var newList = horello.List.fromJSON(list);
          board.lists.push(newList);
          newList.getData();
        })
      board.addList()
      },
      error:function(err){
        console.error(err);
      }
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

// horello.loadData = function(boardId) {

//   $.ajax(horello.apiUrl + "/board/" + boardId + "/lists", {
//     data: {
//       key: horello.apiKey,
//       token: horello.apiToken
//     },
//     method: "GET",
//     success: function(response) {
//       var realLists = _.map(response, horello.List.fromJSON);
//       console.log(JSON.stringify(response))
//     },
//   error:  function(err) {
//     console.error(JSON.stringify(err));
//   }
// });

// horello.loadCards = function(listId){
//   $.ajax({
//     url: horello.apiUrl+"/lists/"+listId+"?fields=name&cards=open&card_fields=name", 
//     data: {
//       key: horello.apiKey, 
//       token: horello.apiToken
//     },
//     method: "GET",
//     success: function(response){
//       var list = board.getList(listId);
//       response.cards.forEach(function(inputcard) { 
//         var card = horello.Card.fromJSON(inputcard);
//         list.cards.push(card);
//         horello.mount(board);
//       })
//     },
//     error: function(error){
//       console.log(JSON.stringify(error))
//     }
//  })
// }














// $.ajax({ method: "POST",
// url: "https://api.trello.com/1/cards",
// data: {
// key:"021d5093185ea965dd6a50153429b08c",
// token:"236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d",
// name: "Joost is awesome, love that guy", 
//  desc: "Using the Trello API is fun and easy!",
//  pos: "top", 
//  due: null,
//  idList: "555c8e8438613a1b6f665efc"
// }, success: function(data) { console.log(data);}, error: function(msg) {console.log(error)} 
//  });
