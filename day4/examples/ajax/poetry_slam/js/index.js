// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(poem){
    var numWords = poem.split(" ").length + 1;
    $("#count").text(numWords);
  }
})
