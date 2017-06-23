"use strict";

window.momentum = window.momentum || {};

// Weather

momentum.WeatherCtrl = function() {
  this.apiKey = "f17f6afd59e4d6e2fd431599cf9ab38c";
  this.apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco&APPID=" + this.apiKey;
};

momentum.WeatherCtrl.prototype = {
	// `fetchWeather(cb<Function>)` method
	// This function should fetch the current weather in Philly by performing an AJAX call. It should pass the given cb (callback) function to the success property of the call.
	//
	// hint. look into $.ajax here: http://api.jquery.com/jquery.ajax/
	// hint. read through the documentation for the OpenWeatherAPI.
  fetchWeather: function(cb) {
		// YOUR CODE HERE
    $.ajax({
      url: this.apiUrl,
      success: function(resp) {
        var tempKelvin = resp['main']['temp'];
        alert(tempKelvin);
        cb(tempKelvin *(9/5) -459.67);
      }
    })
  }
};
