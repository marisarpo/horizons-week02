// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
    var count = resp.split(' ').length;
    $('#count').text(count);
    $('.head').append($('<p>').text(resp));
  }
})
