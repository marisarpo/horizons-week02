// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(response){
    var poem = JSON.stringify(response);
    $('#count').html(poem.length);
  }
})
