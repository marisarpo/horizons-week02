$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var wCount = resp.replace(/  +/g, '').split(' ').length;
    if (resp[0] != ' '){wCount++;}
    $('#count').text(wCount);
  }
})
