// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(result){
    console.log(result.split(' '));
    var count = result.split(' ').length;
    $('#count').text(count);
  }
})
