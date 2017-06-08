// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax ({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var splitWords = resp.split(' ').length;
    var count = $('#count').replaceWith(splitWords);
    console.log(count);
  }
})
