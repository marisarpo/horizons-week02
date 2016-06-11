// "use strict";

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

horello.Card = function(title, desc, listId, cardId) {
    this.id = cardId;
    this.listId = listId;
    this.title = title;
    this.desc = desc;
};

horello.Card.prototype = {
    getId: function() {
        return this.id;
    },

    // The things that change are title and description. To set those things in Trello means we must have a PUT request. 

    getTitle: function() {
        return this.title;
    },

    setTitle: function(titleStr) {
        this.title = titleStr;
        $.ajax(horello.apiUrl + '/cards/' + this.getId(), {
            data: {
              key: horello.apiKey,
              token: horello.apiToken,
              name: titleStr,
            },
            method: 'PUT',
            success: function(data) { 
              this.title = data.name; 
              horello.mount(board);
            },
            error: function(response) {
              console.log(JSON.stringify);
            }
          });
    },

    getDescription: function() {
        return this.desc;
    },

    setDescription: function(desc) {
        this.desc = desc;
        $.ajax(horello.apiUrl + '/cards/' + this.getId(), {
            data: {
              key: horello.apiKey,
              token: horello.apiToken,
              desc: desc,
            },
            method: 'PUT',
            success: function(data) { 
              this.desc = data.desc;
              horello.mount(board);
            },
            error: function(response) {
              console.log(JSON.stringify);
            }
          });
    },

    render: function() {
        // build wrappers
        var wrapper = $('<div></div>');
        var cardwrapper = $('<div class="card" data-list-id="' + this.listId + '" data-card-id="' + this.id + '"></div>');
        var cardmore = $('<span class="card-more"></span>');
        if (this.getDescription()) {
            cardmore.append($('<span class="glyphicon glyphicon-align-left"></span>'));
        }
        var cardbody = $('<div class="card-body">' + this.title + '</div>');

        wrapper.append(cardwrapper);
        cardwrapper.append(cardmore);
        cardwrapper.append(cardbody);
        cardbody.append($("<p></p>")).text(this.title);

        return wrapper.html();
    }
};

horello.Card.fromJSON = function(data) {
    var card = new horello.Card(data.name, data.desc, data.idList, data.id);
    return card;
};


// LIST

horello.List = function(listId, name) {
    this.id = listId;
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
    var cards = this.cards;
        $.ajax(horello.apiUrl + '/cards', {
            data: {
              key: horello.apiKey,
              token: horello.apiToken,
              name: name,
              desc : desc,
              due : null, 
              idList : this.id
            },
            method: 'POST',
            success: function(data) { 
              var card = new horello.Card(name, desc, data.idList, data.id);
              cards.push(card);
              horello.mount(board);
            },
            error: function(response) {
              console.log(JSON.stringify);
            }
        });
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

    loadCards: function() {
      $.ajax(horello.apiUrl + '/lists/' + this.id + '/cards', {
          data: {
            key: horello.apiKey,
            token: horello.apiToken,
          },
          method: 'GET',
          success: function(cardsData) {
            console.log(cardsData);
            this.cards = _.map(cardsData, horello.Card.fromJSON);
            horello.mount(board);
          }.bind(this)
      });
    },

    render: function() {
        // Build wrappers
        var wrapper = $('<div></div>');

        var listContainer = $('<div class="list-container"></div>');
        var listWrapper = $('<div class="list" id="' + this.id + '"></div>');
        var listHeader = $('<div class="list-header"></div>');
        var listBody = $('<div class="list-cards"></div>');
        var listFooter = $('<div class="list-footer"></div>');

        wrapper.append(listContainer);
        listContainer.append(listWrapper);
        listWrapper.append(listHeader);
        listWrapper.append(listBody);
        listWrapper.append(listFooter);
        listHeader.append($('<span class="list-title"></span>').text(this.name));
        listFooter.append($('<button class="add-card" addCardId="' + this.id + '">Add a card...</button>'));
        listFooter.append($('\
      <div class="collapse" id="addCardForm' + this.id + '">\
      <div class="well add-card-form">\
      <input type="text" class="form-control" placeholder="Card title" id="addCardTitle' + this.id + '">\
      <button type="button" class="btn btn-default" id="addCardBtn' + this.id + '">\
      Save\
      </button>\
      <button type="button" class="btn btn-default">\
      <span class="glyphicon glyphicon-remove" id="addCardCancelBtn' + this.id + '"></span>\
      </button>\
      </div>\
      </div>\
    '));

        // Build cards in the body
        console.log(this);
        console.log(this.cards);
        listBody.html(this.cards.map(function(cardItem) {
            return cardItem.render();
        }).join(""));

        return wrapper.html();
    }
};

horello.List.fromJSON = function(data) {
    var list = new horello.List(data.id, data.name, data.cards);
    return list;
};


// BOARD

horello.Board = function() {
    this.lists = [];
    this.id = "55f606a440c3474d1187a4d8";

    this.getLists();
};

horello.Board.prototype = {
  
        addList: function(listName) {
        var lists = this.lists;
        $.ajax(horello.apiUrl + '/lists', {
            data: {
              key: horello.apiKey,
              token: horello.apiToken,
              name: listName,
              idBoard : this.id,
              post : 'bottom'
            },
            method: 'POST',
            success: function(data) { 
              var list = new horello.List(data.id, data.name);
              lists.push(list);
              horello.mount(board);
            },
            error: function(response) {
              console.log(JSON.stringify);
            }
        });
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
        },

        getLists: function() {
          $.ajax(horello.apiUrl + '/boards/' + this.id + '/lists', {
            data: {
              key: horello.apiKey,
              token: horello.apiToken,
            },
            method: 'GET',
            success: function(response) {
              // creating list array
              var listObjects = _.map(response, horello.List.fromJSON);

              // loading cards for list
              listObjects.forEach(function(list) {
                list.loadCards();
              });

              board.lists = listObjects;
            },
            error: function(response) {
              console.log(JSON.stringify);
            }
          });
        }
};
