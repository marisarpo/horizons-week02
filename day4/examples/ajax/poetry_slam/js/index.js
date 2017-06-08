// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    //console.log($('body').text());
    var wordNum = resp.split(' ').length;
    //console.log($(‘<pre>’).text(resp.split(' ').length));
    $('#count').text(wordNum);
  }
})
