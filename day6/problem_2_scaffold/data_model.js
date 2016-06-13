"use strict";

window.twitter = {};

var gId = 0;

twitter.Card = function(tweet) {
  this.tweet = tweet;
  this.id = gId;
  gId++;
};

twitter.Card.prototype = {
  // Exercise 1.A `getId`
  // Write a getter function for the `id` property
  getTweet: function() {
    // YOUR CODE HERE
    return this.tweet;
  },

  setTweet: function(str) {
    // YOUR CODE HERE
    this.tweet = str;
  },

  getId: function(){
    return this.id;
  }
};

twitter.List = function(name) {
  this.name = name;
  this.cards = [];
};

twitter.List.prototype = {
  // Exercise 2.A `getId`
  // Write a getter function for the `id` property
  getName: function() {
    // YOUR CODE HERE
    return this.name;
  },

  addTweet: function(twt) {
    // YOUR CODE HERE
    var card = new twitter.Card(twt);
    this.cards.push(card);
    return card.getId();
  }
};
