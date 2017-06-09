"use strict";

window.momentum = window.momentum || {};



momentum.WeatherCtrl = function() {
  this.apiKey = "d07106494682ff8d1543cd83d2b65b87";
  this.apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&APPID=" + this.apiKey;
  this.cityCode = "5391997"
  // $.ajaxSetup({
  //   data:{
  //     key:this.apiKey
  //   }
  // })
};

momentum.WeatherCtrl.prototype = {

	// `fetchWeather(cb<Function>)` method
	// This function should fetch the current weather in Philly by performing an AJAX call. It should pass the given cb (callback) function to the success property of the call.
	//
	// hint. look into $.ajax here: http://api.jquery.com/jquery.ajax/
	// hint. read through the documentation for the OpenWeatherAPI.
  fetchWeather: function(cb) {
    //console.log('hey');
		$.ajax(this.apiUrl,{
      method:'GET',
      success:function(resp){
        //console.log(resp);
        //console.log(cb);
        cb.call(this,resp);
      }

    })
  }
};
