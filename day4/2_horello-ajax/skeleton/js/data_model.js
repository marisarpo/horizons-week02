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
    this.cardId = id;
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

horello.Card.fromJSON = function(data) {
    var newCard = new horello.Card(data.title, data.desc, data.listId, data.id);
    return newCard;
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
    var newList = new horello.List(data.id, data.name);
    return newList;
};


// BOARD

horello.Board = function (boardId) {
    this.lists = [];
    this.id = boardId;
};

horello.Board.prototype = {
    addList: function(listName) {
        var list = new horello.List(listName);
        this.lists.push(list);
        $ajax(horello.apiUrl + "/boards/" + horello.boardId + "/lists");
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
    },

    getId: function () {
        return this.id;
    }
};

horello.loadData = function(board_id) {
    var listOfLists;
    $.ajax(horello.apiUrl + "/board/" + board_id + "/lists", {
        data: {
            key: horello.apiKey,
            token: horello.apiToken
        },
        method: "GET",
        success: function (response) {
            listOfLists = response;
            console.log(JSON.stringify(response));
            var realLists = _.map(listOfLists, horello.List.fromJSON);
        },
        error: function(err) {
            console.error(JSON.stringify(err));
        }
    });
}
