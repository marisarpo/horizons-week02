// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
var count = 0;
$.ajax({
	url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
	success: function(resp) {
		console.log(resp);
		for (var i=0; i<resp.length-1; i++) {
			if (resp.substring(i,i+1) === ' ' && resp.substring(i+1,i+2) != '.' ) {
				count = count+1;
				console.log(i, count)
			}
		}
		$('#count').text(count);
	}
})

