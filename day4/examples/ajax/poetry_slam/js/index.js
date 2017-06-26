// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
    url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
    success: function(output) {
        var outputArray = output.split(" ");
        var outputLength = outputArray.length;
        $("#count").text(outputLength)
    }
})
