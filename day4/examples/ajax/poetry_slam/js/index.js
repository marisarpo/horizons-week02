$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var count = 0;
    for (var i = 0; i < resp.length; i++) {
      if(resp[i]= ' '){
        count += 1;
      }
    }
    $('#count').text(count);
  }
})
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
