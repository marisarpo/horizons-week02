// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
//1184

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var wordarray = resp.split(" ");
    // console.log(resp);
    var count = wordarray.length;
    $('#count').text(count);
  }
})
