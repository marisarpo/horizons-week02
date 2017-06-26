// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
	url: "http://horizons-json-cors.s3.amazonaws.com/poem.txt",
	success: function(response) {
		$('body').append($('<pre>').text(response));
		var words = response.split(' ');
		var noSpaces = [];
		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			if (word !== '' && word !== '\n') {
				noSpaces.push(word);
			}
		}
		var wordCount = noSpaces.length;
		$('#count').text(wordCount);
	}
})

