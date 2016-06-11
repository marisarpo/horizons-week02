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
horello.Card = function(title, desc, listId) {
  this.id = horello.generateId();
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
    $.ajax("https://api.trello.com/1/cards/575b3d9189cb90e7faf1128d",{
      method:"PUT",
      data:{
        key:"419e1fd8e0b30830e158a368177ee4ad",
        token:"bd8e8b1e493f0da2df624d796fb4e2e25bd9a7d8006c5cf75ec5dfb66e0eb8db",
        name: "Samantha",
        desc: "Horizons"
      },
      success:function(response){
        this.title = titleStr;    //we want to set the title AFTER we get success
        horello.mount(board);
      },
      error:function(err){
        console.error(err);
      }
    })
  },
  getDescription: function() {
    return this.desc;
  },
//need ajax
setDescription: function(desc) {
  $.ajax("https://api.trello.com/1/cards/575b3d9189cb90e7faf1128d",{
    method:"PUT",
    data:{
      key:"419e1fd8e0b30830e158a368177ee4ad",
      token:"bd8e8b1e493f0da2df624d796fb4e2e25bd9a7d8006c5cf75ec5dfb66e0eb8db",
      name: "Samantha",
      desc: "Horizons"
    },
    success:function(response){
        this.desc = desc;    //we want to set the title AFTER we get success
        horello.mount(board);
      },
      error:function(err){
        console.error(err);
      }
    })
},
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
horello.Card.fromJSON = function(data) {
  var description = data.desc;    //data is the entire trello data and desc is a key
                                  // static method -> not part of prototype so we can't use this -> horrello.card.fromJSON()
  var title = data.name;
  var id = data.id;
  var listId = data.idList    // if we called this now it would be horello.Card but that is not any spcific card
  var c = new horello.Card(title, description, listId);
  c.id = id;      //setting the id of the cards
  return c
};
// LIST
horello.List = function(id, name) {
  this.id = id;
  this.name = name;
  this.cards = [];
};
horello.List.prototype = {
  getId: function() {
    return this.id;       // array of lists from ajax     declare fariable for each list that you get back      push each list into array     call get data that refers to the list get data
  },
  getData: function(){                                          //"this" is the object list
    $.ajax("https://api.trello.com/1/lists/"+this.id+"/cards",{        //have to do listId bc the listId is different for every list
      method:"GET",
      data:{
        key:"419e1fd8e0b30830e158a368177ee4ad",
        token:"bd8e8b1e493f0da2df624d796fb4e2e25bd9a7d8006c5cf75ec5dfb66e0eb8db"
      },
      success:function(response){                                         //array of lists from ajax 
        response.forEach(function(card){                                  //declare fariable for each list that you get back 
          var newCard = horello.Card.fromJSON(card);                      //push each list into array
                                                                          //call get data that refers to the list get data
          board.getList(newCard.listId).cards.push(newCard)                     //set into model   //we made listID
                                                                               //get list returns list, 
          horello.mount(board)    //mount = rerendering     everytime we have a card
        })
      },
      error:function(err){
        console.error(err);
      }
    })
  },
  getName: function() {
    return this.name;
  },
  setName: function(name) {
    this.name = name;
  },
  addCard: function(name, desc) {
    $.ajax("https://api.trello.com/1/lists/"+this.getId+"/cards",{
      method:"POST",
      data:{
        key:"419e1fd8e0b30830e158a368177ee4ad",
        token:"bd8e8b1e493f0da2df624d796fb4e2e25bd9a7d8006c5cf75ec5dfb66e0eb8db",
        name: name,   //name is an argument  //can be called anything bc it is post -> it will create a new thing(card)
        description: desc,    //not required
      },
      success:function(response){
                        //horello.Card(title,description, listId)
        var card = new horello.card(name,desc,this.getId());  //this is not talking about the list bc it is called by ajax it refers to the $
        card.id = response.id       //response.id is from trello -> but now we want to set our card.id to response.id
        this.cards.push(card);      //set new card into list
        horello.mount(board);
      }.bind(this),          //use debugger to see where 'this' is           can bind to anything outside of the function
      error:function(err){
        console.error(err);
      }
    })
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
  this.getData();    // refers to board.getdata
};
horello.Board.prototype = {
  addList: function(listName) {
    $.ajax("https://api.trello.com/1/boards/iOTY3uSg/lists",{     //there is another way but this one works bc we specified the board id in the URL
      method:"POST",
      data:{
        key:"419e1fd8e0b30830e158a368177ee4ad",
        token:"bd8e8b1e493f0da2df624d796fb4e2e25bd9a7d8006c5cf75ec5dfb66e0eb8db",
        name: "List 7",
        pos: "bottom"
      },
      success:function(response){
        var newList= new horello.List(response.id, listName);
        this.lists.push(newList);
        horello.mount(board);
      }.bind(this),
      error:function(err){
        console.error(err);
      }
    })
    // var list = new horello.List(listName);
    // this.lists.push(list);
    // return list.getId();
  },
  getList: function(listId) {
    return this.lists.find(function(c) {
      return (c.getId() == listId);
    });
  },
  getData: function(){
    $.ajax("https://api.trello.com/1/boards/iOTY3uSg/lists",{
      method:"GET",
      data:{
        key:"419e1fd8e0b30830e158a368177ee4ad",
        token:"bd8e8b1e493f0da2df624d796fb4e2e25bd9a7d8006c5cf75ec5dfb66e0eb8db"
      },
      success:function(response){
        console.log(response);
        //this is what we want to change
        response.forEach(function(list){
          var newList = horello.List.fromJSON(list);     //add new list that we got from the original list -> take th trello model and fromJSON it 
          board.lists.push(newList);                     //this only have the lists but not the cards
          newList.getData(newList.id);                   //this refers to the horello.List.prototype's getData()
        });
      },
      error:function(err){
        console.error(err);
      }
    })
  },
  render: function() {
    var wrapper = $('<div id="board" class="board"></div>');
    wrapper.html(this.lists.reduce(function(prev, cur) {
      return prev + cur.render();
    }, ""));
    return wrapper;
  }
};
