"use strict";

window.momentum = window.momentum || {};

// Core - time, image

momentum.Core = function() {
  this.timeStr = this.setTime();
  this.quoteStr = "";
  this.weatherStr = '';
  
  this.timeEl = $("#time");
  this.quoteEl = $("#quote");
	this.weatherEl = $("#weatherWidget");
  
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
  	var hours = new Date().getHours();
  	var minutes = new Date().getMinutes();
  	if(minutes < 10) {
  		minutes = "0" + minutes;	
  	}
  	var timeStr = hours + ":" + minutes;

  	this.timeStr =  timeStr;
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
  	console.log(weatherData);
  	this.weatherStr = weatherData.main.temp;
  },
	// `updateTime` method
	// This function should call setTime() so that this.timeStr is updated.
  updateTime: function() {
	this.setTime();
  },
	// `updateWeather` method
	// This function should call weatherCtrl.fetchWeather and pass in this.setWeather as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateWeather: function() {
		// YOUR CODE HERE
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
		this.updateTime();
		this.updateWeather();
		this.updateQuote();
	},
	// `render` method
	// This method should "render" the time, quote and weather strings on your page by replacing the text value of your elements with their respective properties.
	// ex. this.timeStr will be rendered on to the screen using this.timeEl.text(this.timeStr);
  render: function() {
  	this.timeEl.text(this.timeStr);
  	this.weatherEl.text(this.weatherStr)
  	var anchor = $('<div class="anchor"></div>');
  	var centered = $('<div class="centered col-md-4 col-md-offset-4"></div>')
  	var time = $('<h1 id="time">'+this.setTime()+'</h1>')
  	var salutation = $('<h3 id="salutation">'+"Joost, you sure are some good looking fellah"+'</h3>')
  	// var quote = $('<h3 id="quote">'+this.setQuote+'</h3>')
  	var weather = $('<h3 id="weatherWidget">'+this.weatherStr+'</h3>')



  	anchor.append(centered);
  	centered.append(weather);
  	centered.append(time);
  	centered.append(salutation);
  	// centered.append(quote);
  	return anchor.html();
}


 //  	wrapper.html(this.timeEl.text(this.timeStr)
	

	// <div class="col-md-4 col-md-offset-4 header"
	// 				<h1 id="time"> TIME </h1>
	// 				<h3 id='salutation'> SALUTATION</h3>
	// 				<P id="quote"> QUOTE</P>
	// 			</div>
};

momentum.mount = function(core){
	$('#anchor').empty();
	$('#anchor').append(core.render());
	console.log("hihii")
}



// fa936a9d43816a7587ebad77a1695c06
