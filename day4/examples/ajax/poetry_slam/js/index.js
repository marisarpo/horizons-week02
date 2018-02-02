// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
	url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
	success: function(resp) {
		var newString = JSON.stringify(resp).split(" ");
		var count = newString.length;
		$('#count').text(count);
	}
})