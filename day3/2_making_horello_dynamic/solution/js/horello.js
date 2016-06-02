"use strict";

window.horello = {};

// In this exercise, you're going to be building the majority of the
// interactive parts of Horello. In the past few days, you've been
// building the front-end of it. You've been building the UI of your
// application and are now ready to bring it to life.

// [Helper] `generateId`
// This function generates a random, unique string for you use for whatever.
// 
// ex. horello.generateId() -> 'aQ-V-c-u-P4l'
// ex. horello.generateId() -> 'bh-H-N-9-Vdr'
horello.generateId = function() {
	var chunk = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};

// Exercise 1. `Note` Class
// Write a note class that follows the spec described in
// `classSpec.png`. The note class will be made up of different
// properties and methods.
// 

horello.Note = function(title, desc) {
	// YOUR CODE HERE
	this.id = horello.generateId();
	this.title = title;
	this.desc = desc;
	this.createdAt = new Date().toUTCString();
	this.updatedAt = this.createdAt;
};

// note. A way to define methods in a class altogether is like this:
// var Fruit = function() {};
// 
// Fruit.prototype = {
// 		scream: function() { return "YEEEEEEEET"; }
// 		remark:	function() { return "dat boi"; }
// };

horello.Note.prototype = {
	// Exercise 1.A `getId`
	// Write a getter function for the `id` property
	getId: function() {
		return this.id;
	},

	// Exercise 1.B `getTitle`
	// Write a getter function for the `title` property
	getTitle: function() {
		return this.title;
	},

	// Exercise 1.C `setTitle(titleStr<String>)`
	// Write a setter funtion for the `titleStr` property
	// 
	// ex. var note = horello.Note("Thing I had to do", "What was it?");
	// 	note.setTitle("Buy Milk");
	// 	note.getTitle() -> "Buy Milk";
	setTitle: function(titleStr) {
		this.title = titleStr;
	},

	// Exercise 1.D `getDescription`
	// Write a getter function for the `desc` property
	getDescription: function() {
		return this.desc;
	},

	// Exercise 1.E `setDescription(desc<String>)`
	// Write a setter funtion for the `desc` property
	//
	// ex. var note = horello.Note("Thing I had to do", "What was it?");
	// 	note.setDescription("Maybe check Whole Foods?");
	// 	note.getDescription() -> "BMaybe check Whole Foods?;
	setDescription: function(desc) {
		this.desc = desc;
	},

	// [Helper] Example 1.F `render()`
	// This function returns a string with HTML representing the internal object.
	render: function() {
		console.log("Rendering note...");

		// Build wrappers
		var wrapper = $('<div></div>');
		var cardWrapper = $('<div class="card" data-toggle="modal"' +
			' data-target="#cardEdit" id="'+this.id+'"></div>');
		var cardMore = $('<span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span>');
		var cardBody = $('<div class="card-body">'+this.title+'</div>');

		wrapper.append(cardWrapper);
		cardWrapper.append(cardMore);
		cardWrapper.append(cardBody);
		cardBody.append($("<p></p>")).text(this.title);

		return wrapper.html();
	}
};

// Exercise 2. `List` Class
// Write a List class according to the spec in `classSpec.png`. The list
// class will be used to hold all instances of the Notes class, and it
// will also be responsible for

horello.List = function(name) {
	// YOUR CODE HERE
	this.id = horello.generateId();
	this.name = name;
	this.cards = [];
};

horello.List.prototype = {
	// Exercise 2.A `getId`
	// Write a getter function for the `id` property
	getId: function() {
		return this.id;
	},

	// YOUR CODE HERE
	// Exercise 2.B `getName`
	// Write a getter function for the `name` property
	getName: function() {
		return this.name;
	},

	// Exercise 2.C `setName(name<String>)`
	// Write a setter funtion for the `name` property
	// 
	// ex. var l = horello.List("Pokemon");
	// 	l.setTitle("Digimon");
	// 	l.getTitle() -> "Digimon";
	setName: function(name) {
		this.name = name;
	},

	// Exercise 2.D `addCard(title<String>, desc<String>)`
	// Write a function that takes two arguments, `title` and `desc`,
	// which are both strings. It should instantiate a new Note object
	// with those give arguments, and add the newly created object to its
	// array of cards. Finally, it should return the id of the newly
	// created note.
	// 
	// hint. You can create a card using new horello.Note(...)
	addCard: function(name, desc) {
		var card = new horello.Note(name, desc);
		this.cards.push(card);
		return card.getId();
	},
	
	// Exercise 2.E `getCard(cardId<String>)`
	// Write a function that takes one argument, `cardId`, which is a
	// string. It should search its card array for the Note object with
	// the given id, and return it. If the card cannot be found, it should
	// return null.
	// 
	// ex. var l = horello.List("Superheroes");
	// 	var cId = l.addCard("Miss Marvel", "Carol Danvers");
	// 	l.getCard(cId) -> 
	// 	l.getTitle() -> "Digimon";
	// 
	// hint. you can use anything of wha you've learned before!
	getCard: function(cardId) {
		var card = this.cards.filter(function(c) {
			return (c.getId() == cardId);
		});
		if (card.length > 0) {
			return card[0];
		}
		return null;
	},
	
	// Exercise 2.F `rmvCard(cardId<String>)`
	// Write a function that takes one argument, `cardId`, which is a
	// string. It should retrieve the cardObject which corresponds to that
	// cardId (if it exists), remove it from the card array, and return
	// it. If it does not exist, then it should return null. Finally, it
	// should return the id of the newly created note.
	rmvCard: function(cardId) {
		var c = this.getCard(cardId);
		if (c === null) {
			return null;
		}
		var ind = this.cards.indexOf(c);
		this.cards.splice(ind, 1);
		return c;
	},
	
	// [Helper] Example 2.G `render()`
	// This function returns a string with HTML representing the internal
	// object.
	render: function() {
		console.log("Rendering list...");

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
			<input type="text" class="form-control"\
		placeholder="Card title">\
			<button type="button" class="btn btn-default">\
			Save\
			</button>\
			<button type="button"\
		class="btn btn-default"><span\
		class="glyphicon glyphicon-remove"></span>\
			</button>\
			</div>\
			</div>\
			'));

		// Build notes in the body
		listBody.html(this.cards.reduce(function(prev, cur) {
			return prev + cur.render();
		}, ""));

		return wrapper.html();
	}
	
};

// Exercise 3: board

horello.Board = function () {
	this.lists = [];
};

horello.Board.prototype = {
	addList: function(name) {
		var list = new horello.List(name);
		this.lists.push(list);
		return list.getId();
	},

	getList: function(listId) {
		return this.lists.find(function(c) {
			return (c.getId() == listId);
		});
	},

	rmvList: function(listId) {
		var c = this.getList(listId);
		if (c === null) {
			return null;
		}
		var ind = this.lists.indexOf(c);
		this.lists.splice(ind, 1);
		return c;
	},
	
	render: function() {
		console.log("Rendering board...");
		var wrapper = $('<div id="board"></div>');
		wrapper.html(this.lists.reduce(function(prev, cur) {
			return prev + cur.render();
		}, ""));
		return wrapper;		
	},

	renderToHTML: function() {
		return this.render().html();
	}
};

horello.render = function (board) {
  // Remove all existing event handlers
  $('.add-card').off();

  // Unrender and re-render the board.
	$('#boardAnchor').empty();
	$('#boardAnchor').append(board.render());

  // Re-bind.
  $('.add-card').each(function (idx) {
    var id = $(this).attr('addCardId');
    $(this).click(function (e) {
      $('#addCardForm'+id).collapse('toggle');
    });
  });
};
