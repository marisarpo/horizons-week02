"use strict";

window.momentum = window.momentum || {};

// Core - time, image

momentum.Core = function() {
  this.timeStr = momentum.Core.prototype.setTime();
  momentum.Core.prototype.updateTime();
  this.quoteStr = "";
  this.weatherStr = 64;

  this.timeEl = $(".time");
  this.quoteEl = $(".quote");
	this.weatherEl = $(".temp");

  // weather controller
  this.weatherCtrl = new momentum.WeatherCtrl();

  this.weatherCtrl.fetchWeather(momentum.Core.prototype.setWeather);
  (momentum.Core.prototype.updateWeather.bind(this))();

  momentum.Core.prototype.setQuote();
  momentum.Core.prototype.updateQuote();
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
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
      this.timeStr = hours + ":0" + minutes;
    } else {
      this.timeStr = hours + ":" + minutes;
    }
    $(".time").text(this.timeStr);
  },
	// `setQuote` method
	// This method should set the `quoteStr` property of the momentum core. This method will be used as the callback for quoteCtrl's `fetchQuote` function.
	//
	// hint. check out the `Date` object! Use `getHours` and `getMinutes`.
	// hint. figure out what kind of response the quoteData is going to be, and see how you might be able to access the quote of the day from that.
  setQuote: function(quoteData) {
		$.ajax({
      url: "http://quotes.rest/qod.json",
      success: function(data) {
        var quote = data["contents"]["quotes"][0]["quote"];
        $(".quote").text(`"` + quote + `"`);
      }
    })
  },
	// `setWeather` method
	// This method should set the `weatherStr` property of the momentum core. This method will be used as the callback for weatherCtrl's `fetchWeather` function.
	//
	// hint. figure out what kind of response the weatherData is going to be, and see how you might be able to access the quote of the day from that.
  setWeather: function(weatherData) {
    $(".temp").text(("" + weatherData).substr(0,4) + "°");
  },
	// `updateTime` method
	// This function should call setTime() so that this.timeStr is updated.
  updateTime: function() {
		setInterval(momentum.Core.prototype.setTime, 1000);
  },
	// `updateWeather` method
	// This function should call weatherCtrl.fetchWeather and pass in this.setWeather as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
  updateWeather: function() {
    var callOn = this.weatherCtrl;
    setInterval(function() {
      callOn.fetchWeather(momentum.Core.prototype.setWeather);
    }, 10000);
  },
	// `updateQuote` method
	// This function should call quoteCtrl.fetchQuote and pass in this.setQuote as the callback.
	//
	// note. you might run into scoping issues again. You should know how to solve them by now, using .call, .apply, or .bind.
	updateQuote: function() {
		setInterval(momentum.Core.prototype.setQuote, 1000);
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
