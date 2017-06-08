// YOUR CODE HERE
console.log($.ajax)
var count;
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    resp = resp.replace(/ +/g, ' ')
    count = _.countBy(resp);
    $('')
  }
})

// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
