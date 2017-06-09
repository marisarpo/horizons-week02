// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
	url:'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
	success: function(resp) {
		var temp = [];
		temp = resp.split(' ');
		console.log(temp);
		$('#count').text(temp.length);
	}
})