// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

//$.ajax;


$.ajax({
	url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
	success: function(resp){
    //console.log(resp);
		var poem = resp;
		console.log(poem);
		var array = poem.split(" ");
    $('body').append($('<pre>').text(resp));
		var number = array.length;
		$('#count').text(number);
	}
})
