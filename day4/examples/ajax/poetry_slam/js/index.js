// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
		url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
		success: function(resp) {
			$('body').append($('<pre>').text(resp));
			var words = $('pre').text().split(' ').length;
			$('#count').text(words);
		}
})