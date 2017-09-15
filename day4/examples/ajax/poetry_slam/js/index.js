// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    console.log(resp);
    $('body').append($('<prev>').text(resp));
    var words = resp.split(" ")
    var count = words.length
    $('#count').text(count)
}
})
