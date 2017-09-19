// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
    url:'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
    success: function(poem){
      var numWords = poem.split(" ").length;
      $('#count').text(numWords);
    }
});
