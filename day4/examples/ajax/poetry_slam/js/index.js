$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    $('#count').text(resp.split(' ').length);
  }
})
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
