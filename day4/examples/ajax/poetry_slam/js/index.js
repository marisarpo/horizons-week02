// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$(function() {

  $.ajax({
    url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
    success: function(resp) {
      var numWords = resp.split(" ").length;
      $('#count').text(numWords);
    }
  });

});
