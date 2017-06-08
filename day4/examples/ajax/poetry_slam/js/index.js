// YOUR CODE HERE
console.log($.ajax)
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    resp = resp.replace(/ +/g, ' ')
    console.log( _.countBy(resp));
  }
})

// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
