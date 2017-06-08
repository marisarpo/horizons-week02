// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

var len;

$.ajax({
	url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
	success: function(resp) {
		len = resp.split(" ").length
		$("#count").text(len);
	}
})

//console.log(poem.response)

//$("#count").append(poem)