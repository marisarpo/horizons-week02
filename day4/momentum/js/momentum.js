"use strict";

window.momentum = window.momentum || {};

// Core - time, image

momentum.Core = function() {
  this.timeStr = "";
  this.quoteStr = "";
  this.weatherStr = 64;

  this.timeEl = $(".time");
  this.quoteEl = $(".quote");
	this.weatherEl = $(".temp");

  // weather controller
  this.weatherCtrl = new momentum.WeatherCtrl();

  // quote controller
  this.quoteCtrl = new momentum.QuoteCtrl();
};

momentum.Core.prototype = {
	// `setTime` method
	// This method should calculate the current time and save it to timeStr in the form HH:MM, like: 12:01 or 21:34.
	//
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
  setTime: function() {
		// YOUR CODE HERE
    var d=new Date();
    var hours=d.getHours();
    var min=d.getMinutes();
    var timeStr=hours+':'+min;
    this.timeStr=timeStr;
    //this.timeEl.text(timeStr);
  },
	// `setQuote` method
	// This method should set the `quoteStr` property of the momentum core. This method will be used as the callback for quoteCtrl's `fetchQuote` function.
	//
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
	// hint. figure out what kind of response the quoteData is going to be, and see how you might be able to access the quote of the day from that.
  setQuote: function(quoteData) {
		// YOUR CODE HERE


  },
	// `setWeather` method
	// This method should set the `weatherStr` property of the momentum core. This method will be used as the callback for weatherCtrl's `fetchWeather` function.
	//
	// hint. figure out what kind of response the weatherData is going to be, and see how you might be able to access the quote of the day from that.
  setWeather: function(weatherData) {
		// YOUR CODE HERE
    console.log('here3');
    this.weatherStr=weatherData.main.temp;
    console.log(this.weatherStr);
  },
	// `updateTime` method
	// This function should call setTime() so that this.timeStr is updated.
  updateTime: function() {
		// YOUR CODE HERE
    this.setTime();
  },
	// `updateWeather` method
	// This function should call weatherCtrl.fetchWeather and pass in this.setWeather as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateWeather: function() {
		// YOUR CODE HERE
  //  var fn=this.setWeather.bind(this);
    console.log('here1');
    this.weatherCtrl.fetchWeather(this.setWeather.bind(this));
  },
	// `updateQuote` method
	// This function should call quoteCtrl.fetchQuote and pass in this.setQuote as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
	updateQuote: function() {
		// YOUR CODE HERE
	},
	// `start` method
	// This method will call some of the `update...` methods. This function will be called when the page has finished loading, so that Momentum can start off with the more up-to-date data.
	start: function() {
		// YOUR CODE HERE
    this.setTime();
    this.updateWeather();
	},
	// `render` method
	// This method should "render" the time, quote and weather strings on your page by replacing the text value of your elements with their respective properties.
	// ex. this.timeStr will be rendered on to the screen using this.timeEl.text(this.timeStr);
  render: function() {
		// YOUR CODE HERE
    this.timeEl.text(this.timeStr);
    this.weatherEl.text(this.weatherStr);
  }
};
