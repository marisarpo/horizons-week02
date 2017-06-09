"use strict";

window.momentum = window.momentum || {};

// Core - time, image


momentum.Core = function() {
  this.timeStr = momentum.Core.prototype.setTime();
  this.greeting = momentum.Core.prototype.setGreeting();
  // this.quoteStr = " ";
  this.weatherStr = momentum.WeatherCtrl.prototype.fetchWeather();
  // setInterval(momentum.Core.WeatherCtrl.fetchWeather(), 36000000)

  this.timeEl = $("YOUR SELECTOR HERE");
  this.quoteEl = $("YOUR SELECTOR HERE");
	this.weatherEl = $("YOUR SELECTOR HERE");

  // weather controller
  this.weatherCtrl = new momentum.WeatherCtrl();
  this.weatherCtrl.fetchWeather(momentum.Core.prototype.setWeather);
  (momentum.Core.prototype.updateWeather.bind(this))();
  this.weatherCtrl.fetchIcon(momentum.Core.prototype.setWeather);
  (momentum.Core.prototype.updateWeatherIcon.bind(this))();

  // quote controller
  // this.quoteCtrl = new momentum.QuoteCtrl();
  // this.quoteCtrl.fetchQuote(momentum.Core.prototype.setQuote)
  // (momentum.Core.prototype.updateQuote.bind(this))();
};

momentum.Core.prototype = {
	// `setTime` method
	// This method should calculate the current time and save it to timeStr in the form HH:MM, like: 12:01 or 21:34.
	//
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
  setTime: function() {
		var d = new Date();
    var hrs = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = "0"+min;
    }
    this.timeStr = hrs+":"+min;
    $('#time').text(this.timeStr);
  },
	// `setQuote` method
	// This method should set the `quoteStr` property of the momentum core. This method will be used as the callback for quoteCtrl's `fetchQuote` function.
	//
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
	// hint. figure out what kind of response the quoteData is going to be, and see how you might be able to access the quote of the day from that.
  setQuote: function(quoteData) {
    console.log(quoteData);
		this.quoteStr = quoteData;/*["contents"]["quotes"]["quote"]*/;
    console.log(this.quoteStr);

    $('#quote').text(this.quoteStr);
  },
	// `setWeather` method
	// This method should set the `weatherStr` property of the momentum core. This method will be used as the callback for weatherCtrl's `fetchWeather` function.
	//
	// hint. figure out what kind of response the weatherData is going to be, and see how you might be able to access the quote of the day from that.
  setWeather: function(weatherData) {
    this.weatherStr = weatherData["main"]["temp"] - 273;
    this.weatherStr = Math.round((9/5)*this.weatherStr + 32) + "ºF";

    console.log("temp: ",this.weatherStr)
		$('#weather').text(this.weatherStr);
  },
  setWeatherIcon: function(weatherData) {
    var descrip = weatherData["weather"][0]["description"];
    console.log("data: ",descrip);
    if (descrip.indexOf("clear") >= 0) {
      this.weatherIcon = "glyphicon glyphicon-certificate"
    } else {
      this.weatherIcon = "glyphicon glyphicon-cloud"
    }
    console.log("icon: ",this.weatherIcon);
    $('#icon').addClass(this.weatherIcon);
  },
  setGreeting: function() {
    var hrs = (new Date()).getHours();
    var addon = "Morning";
    console.log(hrs);
    if (hrs > 11)
      addon = "Afternoon"
    if (hrs > 16)
      addon = "Evening"
    this.greeting = "Good "+addon;
    $("#greeting").text(this.greeting);
  },
	// `updateTime` method
	// This function should call setTime() so that this.timeStr is updated.
  updateTime: function() {
    setInterval(function() {
      momentum.Core.prototype.setTime();
      momentum.Core.prototype.setGreeting();
    }, 1000)
  },
	// `updateWeather` method
	// This function should call weatherCtrl.fetchWeather and pass in this.setWeather as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateWeather: function() {
    var self = this.weatherCtrl;
    setInterval(function() {
      self.fetchWeather(momentum.Core.prototype.setWeather);
    }, 36000000)
  },
  updateWeatherIcon: function() {
    var self = this.weatherCtrl;
    setInterval(function() {
      self.fetchIcon(momentum.Core.prototype.setWeatherIcon);
    }, 36000000)
  },
	// `updateQuote` method
	// This function should call quoteCtrl.fetchQuote and pass in this.setQuote as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
	updateQuote: function() {
    var self = this.quoteCtrl;
    self.fetchQuote(momentum.Core.prototype.setQuote);
    // setInterval(function() {
    //   self.fetchQuote(momentum.Core.prototype.setQuote)
    // }, 36000000000000)
	},
	// `start` method
	// This method will call some of the `update...` methods. This function will be called when the page has finished loading, so that Momentum can start off with the more up-to-date data.
	start: function() {
		// YOUR CODE HERE
	},
	// `render` method
	// This method should "render" the time, quote and weather strings on your page by replacing the text value of your elements with their respective properties.
	// ex. this.timeStr will be rendered on to the screen using this.timeEl.text(this.timeStr);
  render: function() {
		// YOUR CODE HERE
  }
};
