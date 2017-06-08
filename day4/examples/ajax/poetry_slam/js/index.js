// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
	url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
	success: function(resp){
		console.log(resp);
		var textCount = resp.length;
		console.log(textCount);
		$('#count').append($('<number>').text(textCount));
	}
})

