// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function (resp) {
    $('body').append($('<pre>').text(resp));
    $('h1 span').text(resp.length);
  }
})
