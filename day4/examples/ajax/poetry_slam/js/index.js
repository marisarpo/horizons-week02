// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    var number = counting(resp);
    $('#count').text(number);
    // $('body').append($('<p>').text(resp));
    console.log(newString);
  }
})

function counting(string) {
  var count = 0;
  var list = string.split(' ');
  list.forEach(function(item) {
    if (item === 'works') count++;
  })
  return count;
}
