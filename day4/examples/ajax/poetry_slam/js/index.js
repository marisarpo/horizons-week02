// YOUR CODE HERE
// See poetry_slam/index.html for instructions

$.ajax({
  url: "http://horizons-json-cors.s3.amazonaws.com/poem.txt",
  success: function(resp) {
    var wordCount = null;
    wordCount = resp.split(" ").length;
    $('#count').text(wordCount);
  }
})
