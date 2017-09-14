"use strict";

window.momentum = window.momentum || {};

// Weather

momentum.WeatherCtrl = function() {
  this.apiKey = "7f654f98f64e142a745ae9e66a83cba1";
  this.apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&APPID=" + this.apiKey;
};

momentum.WeatherCtrl.prototype = {
	// `fetchWeather(cb<Function>)` method
	// This function should fetch the current weather in Philly by performing an AJAX call. It should pass the given cb (callback) function to the success property of the call.
	//
	// hint. look into $.ajax here: http://api.jquery.com/jquery.ajax/
	// hint. read through the documentation for the OpenWeatherAPI.
  fetchWeather: function(cb) {
		// YOUR CODE HERE
    $.ajax(this.apiUrl, {
      success: function(data){
        return cb(data);
      }
    })
  }
};
