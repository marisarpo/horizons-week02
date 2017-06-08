// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(response) {
    var arr = response.split(' ');
    var count = arr.length;
    $('#count').replaceWith(count);
  }
})
