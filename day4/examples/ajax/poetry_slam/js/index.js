// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$( window ).on('load', function() {

  $.ajax({
    url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
    success: function(resp) {
      var wordCount = resp.split(' ').length;
      $('#count').text(wordCount);
    }
  })
})
