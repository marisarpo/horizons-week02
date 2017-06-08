// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
console.log("hello")

var poemLength;

$.ajax({
	url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
	success: function(resp) {
		poemLength = resp.split(" ").length;
		$("#count").text(poemLength);
	}
})
