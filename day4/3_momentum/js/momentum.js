"use strict";

window.momentum = window.momentum || {};

// Core - time, image

momentum.Core = function() {
  this.timeStr = "";
  this.quoteStr = '“Of all the things that can boost emotions, motivation, and perceptions during a workday, the single most important is making progress in meaningful work.” - Teresa Amabile';
  this.weatherStr = 64;
  this.weatherIcon = "";
  
  this.timeEl = $("#time");
  this.quoteEl = $("#quote");
  this.weatherEl = $("#topright");
  this.greetingEl = $("#greeting")

  
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
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        if (hour < 10) hour = "0" + hour;
        if (min < 10) min = "0" + min;
        this.timeStr = hour + ":" + min;
  },
	// `setQuote` method
	// This method should set the `quoteStr` property of the momentum core. This method will be used as the callback for quoteCtrl's `fetchQuote` function.
	// 
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
	// hint. figure out what kind of response the quoteData is going to be, and see how you might be able to access the quote of the day from that.
  setQuote: function(quoteData) {
		this.quoteStr = quoteData.message;
  },
	// `setWeather` method
	// This method should set the `weatherStr` property of the momentum core. This method will be used as the callback for weatherCtrl's `fetchWeather` function.
	// 
	// hint. figure out what kind of response the weatherData is going to be, and see how you might be able to access the quote of the day from that.
  setWeather: function(weatherData) {
		this.weatherStr = Math.round(weatherData.main.temp - 273.15);
        this.weatherIcon = weatherData.weather[0].icon;
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
		this.weatherCtrl.fetchWeather(this.setWeather.bind(this));
  },
	// `updateQuote` method
	// This function should call quoteCtrl.fetchQuote and pass in this.setQuote as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
	updateQuote: function() {
		this.quoteCtrl.fetchQuote(this.setQuote.bind(this));
	},
	// `start` method
	// This method will call some of the `update...` methods. This function will be called when the page has finished loading, so that Momentum can start off with the more up-to-date data.
	start: function() {
		this.updateWeather();
        this.updateTime();
        this.updateQuote();
	},
	// `render` method
	// This method should "render" the time, quote and weather strings on your page by replacing the text value of your elements with their respective properties.
	// ex. this.timeStr will be rendered on to the screen using this.timeEl.text(this.timeStr);
  render: function() {
		this.timeEl.text(this.timeStr);
        this.weatherEl.text(this.weatherStr + "\u2103");
        this.weatherEl.append('<img src = "http://openweathermap.org/img/w/' + this.weatherIcon + '.png">');
        var hour = new Date().getHours();
        var str = "";
        if (hour < 6) { str = "Good night, David."} 
        else if (hour < 12) {str = "Good morning, David."}
        else if (hour < 18) {str = "Good afternoon, David."}
        else {str = "Good evening, David."}
        this.greetingEl.text(str);
        this.quoteEl.text(this.quoteStr);
  }
};
