$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var numWords = (resp.trim().split(/\s+/).length);
    $('#count').text(numWords);
  }
})
