"use strict";

window.momentum = window.momentum || {};

// Core - time, image

momentum.Core = function() {
  this.timeStr = "";
  this.quoteStr = "";
  this.weatherStr = 64;
  
  this.timeEl = $(".time");
  this.quoteEl = $(".quote");
	this.weatherEl = $(".weather");
  
  // weather controller
  this.weatherCtrl = new momentum.WeatherCtrl();
  
  // quote controller
  this.quoteCtrl = new momentum.QuoteCtrl();
};

momentum.Core.prototype = {
  setTime: function() {
		// YOUR CODE HERE
  },
  setQuote: function(quoteData) {
		// YOUR CODE HERE
  },
  setWeather: function(weatherData) {
		// YOUR CODE HERE
  },
  updateTime: function() {
		// YOUR CODE HERE
  },
  updateWeather: function() {
		// YOUR CODE HERE
  },
	updateQuote: function() {
		// YOUR CODE HERE
	},
	start: function() {
		// YOUR CODE HERE
	},
  render: function() {
		// YOUR CODE HERE
  }
};
