"use strict";

window.momentum = window.momentum || {};

// Weather

momentum.WeatherCtrl = function() {
  this.apiKey = "YOUR APP ID HERE";
  this.apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&APPID=" + this.apiKey;
};

momentum.WeatherCtrl.prototype = {
	// `fetchWeather(cb<Function>)` method
	// This function should fetch the current weather in Philly by performing an AJAX call. It should pass the given cb (callback) function to the success property of the call.
	// 
	// hint. look into $.ajax here: http://api.jquery.com/jquery.ajax/
	// hint. read through the documentation for the OpenWeatherAPI.
  fetchWeather: function(cb) {
  	$.ajax("http://api.openweathermap.org/data/2.5/weather", {
  		method: "GET",
  		data: {
  			APPID:"fa936a9d43816a7587ebad77a1695c06",
  			zip: "19104,us",
  		}, success: cb
  	});
  }
};
