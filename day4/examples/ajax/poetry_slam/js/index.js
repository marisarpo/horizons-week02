// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(response) {
    var text = response.split(" ");
    $('body').append($('<prev>').text(response))
    $('#count').text(text.length)
  }
})
