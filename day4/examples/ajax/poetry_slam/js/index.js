// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt';
  success: function(resp) {
    var words = resp.split(' ');
    var count = 0;
    for (var i = 0; i < words.length; i++) {
      count++;
    }
    $('#count').text(append);
  }
})
