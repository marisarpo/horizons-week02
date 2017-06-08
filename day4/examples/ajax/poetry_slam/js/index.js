// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt


$(document).ready(function(){

$.ajax({
	url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
	success: function(resp){
		$('body').append($('<pre>').text(resp))
		// $('pre').on('keypress', function(){
	    var words = $.trim($('pre').text()).split(/[\s\.\?]+/);

		// });
		$('#count').text(words.length);
	}
	
}

)


});