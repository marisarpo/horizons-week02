"use strict";

window.horello = {};

// In this exercise, you're going to be building the majority of the interactive parts of Horello. In the past few days, you've been building the front-end of it. You've been building the UI of your application and are now ready to bring it to life.

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
  }
  return chunk() + chunk() + '-' + chunk() + '-' + chunk() + '-' +
    chunk() + '-' + chunk() + chunk() + chunk();
};

// Exercise 1. `Note` Class
// Write a note class that follows the spec described in `classSpec.png`. The note class will be made up of different properties and methods.
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
		// TODO: need spec for components
		// console.log("Rendering note...");
		// Build wrappers
		var wrapper = $('<div></div>');
		
		var noteWrapper = $('<div></div>');
		var noteHeader = $('<div></div>');
		var noteBody = $('<div></div>');
		
		wrapper.append(noteWrapper);
		noteWrapper.append(noteHeader);
		noteWrapper.append(noteBody);
		// 
		noteHeader.append($("<h2></h2>").text(this.title));
		noteBody.append($("<p></p>").text(this.desc));
		
		return wrapper.html();
	}
};
	
// Exercise 2. `List` Class
// Write a List class according to the spec in `classSpec.png`. The list class will be used to hold all instances of the Notes class, and it will also be responsible for  

horello.List = function(name) {
	// YOUR CODE HERE
	this.name = name;
	this.cards = [];
};

horello.List.prototype = {
	// YOUR CODE HERE
	// Exercise 2.A `getName`
	// Write a getter function for the `name` property
	getName: function() {
		return this.name;
	},
	// Exercise 2.B `setName(name<String>)`
	// Write a setter funtion for the `name` property
	// 
	// ex. var l = horello.List("Pokemon");
	// 	l.setTitle("Digimon");
	// 	l.getTitle() -> "Digimon";
	setName: function(name) {
		this.name = name;
	},
	// Exercise 2.C `addCard(title<String>, desc<String>)`
	// Write a function that takes two arguments, `title` and `desc`, which are both strings.
	// It should instantiate a new Note object with those give arguments, and add the newly created object to its array of cards.
	// Finally, it should return the id of the newly created note.
	// 
	// hint. You can create a card using new horello.Note(...)
	addCard: function(name, desc) {
		var card = new horello.Note(name, desc);
		this.cards.push(card);
		return card.getId();
	},
	// Exercise 2.D `getCard(cardId<String>)`
	// Write a function that takes one argument, `cardId`, which is a string.
	// It should search its card array for the Note object with the given id, and return it. If the card cannot be found, it should return null.
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
	
	// Exercise 2.E `rmvCard(cardId<String>)`
	// Write a function that takes one argument, `cardId`, which is a string.
	// It should retrieve the cardObject which corresponds to that cardId (if it exists), remove it from the card array, and return it.
	// If it does not exist, then it should return null.
	// Finally, it should return the id of the newly created note.
	rmvCard: function(cardId) {
		var c = this.getCard(cardId);
		if (c === null) {
			return null;
		}
		var ind = this.cards.indexOf(c);
		this.cards.splice(ind, 1);
		return c;
	},
	
	// [Helper] Example 2.F `render()`
	// This function returns a string with HTML representing the internal object.
	render: function() {
		// TODO: Need full component spec
		// console.log("Rendering list...");

		// Build wrappers
		var wrapper = $('<div></div>');
		
		var listWrapper = $('<div></div>');
		var listHeader = $('<div></div>');
		var listBody = $('<div></div>');
		
		wrapper.append(listWrapper);
		listWrapper.append(listHeader);
		listWrapper.append(listBody);
		// 
		listHeader.append($("<h2></h2>").text(this.name));
		
		// TODO: Style header
		
		// Build notes in the body
		listBody.html(this.cards.reduce(function(prev, cur) {
			return prev + cur.render();
		}, ""));
		
		// TODO: Style footer
		
		return wrapper.html();
	}
	
};

// Exercise 3. Event Handling (Linking to UI)
// Handle the events
