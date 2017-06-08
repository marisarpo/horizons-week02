// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  
  success: function(resp) {
    var arr = resp.split(" ");
    console.log(arr.length);

    $('#count')
      .replaceWith(arr.length)
  }
});
