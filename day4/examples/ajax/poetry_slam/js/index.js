// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

// link = https://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
  success: function(resp) {
    var words = 1;
    for (var i = 0; i < resp.length; i++) {
      if (resp[i] === ' ') {
        words ++;
      };
    }
    $('#count').text(words);
  }
});
